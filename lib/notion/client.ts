import "server-only";

import { Client } from "@notionhq/client";

function getNotionApiKey(): string {
  const key = process.env.NOTION_API_KEY;
  if (!key) {
    throw new Error(
      "NOTION_API_KEY environment variable is not set. " +
        "Please add it to your .env.local file."
    );
  }
  return key;
}

function getNotionDatabaseId(): string {
  const id = process.env.NOTION_GEARS_DATABASE_ID;
  if (!id) {
    throw new Error(
      "NOTION_GEARS_DATABASE_ID environment variable is not set. " +
        "Please add it to your .env.local file."
    );
  }
  return id;
}

export const notion = new Client({
  auth: getNotionApiKey(),
});

export const GEARS_DATABASE_ID = getNotionDatabaseId();
