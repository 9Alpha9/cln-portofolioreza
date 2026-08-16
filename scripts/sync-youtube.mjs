import { writeFile, readFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { put } from "@vercel/blob";
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UCLd2quRGf0O-4DdDHpgkMTQ";
const MAX_VIDEOS = Number.parseInt(process.env.YOUTUBE_MAX_VIDEOS ?? "15", 10);
const ROOT = new URL("../", import.meta.url);
const OUTPUT_PATH = new URL("content/media/youtube-media.json", ROOT);
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function parseEntry(entry) {
  const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  const titleMatch = entry.match(/<media:title>([^<]+)<\/media:title>/);
  const thumbnailMatch = entry.match(/<media:thumbnail url="([^"]+)"/);
  const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
  const viewsMatch = entry.match(/views="(\d+)"/);

  if (!videoIdMatch || !titleMatch || !publishedMatch) return null;

  return {
    id: videoIdMatch[1],
    title: titleMatch[1],
    thumbnail: thumbnailMatch?.[1] ?? `https://i.ytimg.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
    publishedAt: publishedMatch[1],
    views: Number.parseInt(viewsMatch?.[1] ?? "0", 10),
    url: `https://www.youtube.com/shorts/${videoIdMatch[1]}`,
  };
}

async function main() {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const response = await fetch(feedUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
  }

  const xml = await response.text();
  const entries = xml.split("<entry>").slice(1);

  const videos = entries
    .map(parseEntry)
    .filter((v) => v !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_VIDEOS);

  if (videos.length === 0) {
    throw new Error("YouTube feed returned no videos");
  }

  // Load existing media if available to check for existing blob URLs
  let existingMedia = [];
  try {
    if (existsSync(OUTPUT_PATH)) {
      const data = await readFile(OUTPUT_PATH, "utf8");
      existingMedia = JSON.parse(data);
    }
  } catch (err) {
    console.warn("Failed to load existing media, proceeding as fresh sync:", err.message);
  }

  const existingMap = new Map(existingMedia.map((v) => [v.id, v]));

  // Process videos sequentially to avoid rate limits
  for (const video of videos) {
    const existing = existingMap.get(video.id);

    if (existing?.videoUrl && typeof existing.videoUrl === "string" && existing.videoUrl.startsWith("https://")) {
      // We already have a valid Vercel Blob URL for this video, carry it over
      video.videoUrl = existing.videoUrl;
      console.log(`[SKIP] Already synced to Blob: ${video.id}`);
      continue;
    }

    if (!BLOB_TOKEN) {
      console.warn(`[WARNING] BLOB_READ_WRITE_TOKEN is not set. Skipping download and upload for ${video.id}`);
      continue;
    }

    try {
      console.log(`[DOWNLOAD] Fetching MP4 for ${video.id}...`);
      const tempPath = join(tmpdir(), `${video.id}.mp4`);

      // Download best format (up to 720p/1080p, prioritizing size/quality balance)
      execSync(`yt-dlp -f "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4]/best" --merge-output-format mp4 -o "${tempPath}" "https://www.youtube.com/watch?v=${video.id}"`);

      console.log(`[UPLOAD] Uploading ${video.id} to Vercel Blob...`);
      const fileStream = createReadStream(tempPath);
      const blobResult = await put(`youtube/${video.id}.mp4`, fileStream, {
        access: "public",
        token: BLOB_TOKEN,
      });

      video.videoUrl = blobResult.url;
      console.log(`[SUCCESS] Synced ${video.id}: ${blobResult.url}`);

      // Clean up temp file
      try {
        execSync(`rm "${tempPath}"`);
      } catch (e) {
        /* ignore cleanup error */
      }
    } catch (err) {
      console.error(`[ERROR] Failed to process ${video.id}:`, err.message);
      // Fallback: carry over old url if it existed, otherwise it will remain undefined
      if (existing?.videoUrl) video.videoUrl = existing.videoUrl;
    }
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(videos, null, 2)}\n`, "utf8");
  console.log(`Finished processing ${videos.length} YouTube videos to ${OUTPUT_PATH}`);
}

try {
  await main();
} catch (err) {
  console.error(`YouTube sync failed: ${err}`);
  process.exit(1);
}
