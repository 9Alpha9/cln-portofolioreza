import { head, put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";

const mediaPath = new URL("../content/media/instagram-media.json", import.meta.url);
const token = process.env.BLOB_READ_WRITE_TOKEN;
const maxVideos = Number.parseInt(process.env.INSTAGRAM_BLOB_MAX_VIDEOS ?? "3", 10);

if (!token) {
  throw new Error("BLOB_READ_WRITE_TOKEN is not set");
}

const media = JSON.parse(await readFile(mediaPath, "utf8"));
const videos = media
  .filter((item) => item.media_type === "VIDEO" && item.media_url)
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .slice(0, maxVideos);

for (const video of videos) {
  const pathname = `instagram/videos/${video.id}.mp4`;

  try {
    const existing = await head(pathname, { token });
    video.media_url = existing.url;
    video.blob_url = existing.url;
    continue;
  } catch {}

  const response = await fetch(video.media_url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${video.id}: ${response.status}`);
  }

  const blob = await put(pathname, response.body, {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 31_536_000,
    contentType: "video/mp4",
    token,
  });

  video.media_url = blob.url;
  video.blob_url = blob.url;
}

await writeFile(mediaPath, `${JSON.stringify(media, null, 2)}\n`, "utf8");
console.log(`Uploaded ${videos.length} Instagram videos to Vercel Blob`);
