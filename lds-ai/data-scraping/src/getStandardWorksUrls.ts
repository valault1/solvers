import {
  getContentTextFromBodyLdsWebsite,
  getLinksFromBodyLdsWebsite,
} from "./helpers";
import { LinksUrl, StandardWorksContentTypes, worksByUrl } from "./types";

export const getStandardWorksUrls = (): LinksUrl[] => {
  return StandardWorksContentTypes.map((contentType) => {
    return {
      url: worksByUrl[contentType],
      contentType,
      links: [
        {
          getLinksFromBody: getLinksFromBodyLdsWebsite,
          resultingUrlsType: "content",
          getContentText: getContentTextFromBodyLdsWebsite,
        },
      ],
    };
  });
};
