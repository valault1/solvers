import { getConferenceTalkSeedUrls, main } from "./getConferenceTalkUrls";
import { Content, ContentType, ContentTypes, TableOfContentUrl } from "./types";

for (let contentType of ContentTypes) {
  processContentType(contentType);
}

function processContentType(contentType: ContentType) {
  switch (contentType) {
    case "conference-talk":
      {
        const urls = getConferenceTalkSeedUrls();
        console.log({ urls });
      }
      break;
  }
}

function processTocUrl(url: TableOfContentUrl): Content[] {
  return [];
}
