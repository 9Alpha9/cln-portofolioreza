export const YT_THUMBNAIL_SIZES = ["maxresdefault", "sddefault", "hqdefault"] as const;

export function youtubeThumbnailUrl(videoId: string, index = 0): string {
  const size = YT_THUMBNAIL_SIZES[Math.min(index, YT_THUMBNAIL_SIZES.length - 1)];
  return `https://i.ytimg.com/vi/${videoId}/${size}.jpg`;
}
