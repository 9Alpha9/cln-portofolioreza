import json
import os
import sys
from pathlib import Path

from instaloader import Instaloader, Profile

USERNAME = os.environ.get("INSTAGRAM_USERNAME", "tahutech.idn")
MAX_POSTS = int(os.environ.get("INSTAGRAM_MAX_POSTS", "30"))

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = ROOT / "data" / "instagram-media.json"


def main():
    loader = Instaloader(quiet=True, download_pictures=False, download_videos=False)
    # anonymous, no login() call needed for public profile metadata

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

    OUTPUT_PATH.write_text(json.dumps(posts, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {len(posts)} Instagram videos to {OUTPUT_PATH}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"Error syncing Instagram: {err}", file=sys.stderr)
        sys.exit(1)
