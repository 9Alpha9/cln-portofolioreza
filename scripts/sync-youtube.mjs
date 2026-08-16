import { writeFile } from "node:fs/promises";

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UCLd2quRGf0O-4DdDHpgkMTQ";
const MAX_VIDEOS = Number.parseInt(process.env.YOUTUBE_MAX_VIDEOS ?? "15", 10);
const ROOT = new URL("../", import.meta.url);
const OUTPUT_PATH = new URL("content/media/youtube-media.json", ROOT);

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

  await writeFile(OUTPUT_PATH, `${JSON.stringify(videos, null, 2)}\n`, "utf8");
  console.log(`Synced ${videos.length} YouTube videos to ${OUTPUT_PATH}`);
}

try {
  await main();
} catch (err) {
  console.error(`YouTube sync failed: ${err}`);
  process.exit(1);
}
