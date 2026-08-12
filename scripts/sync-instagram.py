import json
import os
import sys
from pathlib import Path

from instaloader import Instaloader, Profile

USERNAME = os.environ.get("INSTAGRAM_USERNAME", "tahutech.idn")
MAX_POSTS = int(os.environ.get("INSTAGRAM_MAX_POSTS", "30"))
STRICT_MODE = os.environ.get("INSTAGRAM_STRICT", "false").lower() == "true"

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = ROOT / "content" / "media" / "instagram-media.json"


def main():
    loader = Instaloader(quiet=True, download_pictures=False, download_videos=False)
    profile = Profile.from_username(loader.context, USERNAME)

    posts = []
    for post in profile.get_posts():
        if post.is_video:
            posts.append(
                {
                    "id": post.shortcode,
                    "media_type": "VIDEO",
                    "media_url": post.video_url,
                    "thumbnail_url": post.url,
                    "permalink": f"https://www.instagram.com/p/{post.shortcode}/",
                    "caption": post.caption,
                    "timestamp": post.date_utc.strftime("%Y-%m-%dT%H:%M:%S+0000"),
                }
            )
        if len(posts) >= MAX_POSTS:
            break

    if not posts:
        raise RuntimeError("Instagram returned no video posts")

    OUTPUT_PATH.write_text(json.dumps(posts, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {len(posts)} Instagram videos to {OUTPUT_PATH}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"Instagram sync skipped: {err}", file=sys.stderr)
        if STRICT_MODE:
            sys.exit(1)
