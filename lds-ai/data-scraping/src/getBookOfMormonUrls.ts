import {
  getContentTextFromBodyLdsWebsite,
  getLinksFromBodyLdsWebsite,
} from "./helpers";
import { LinksUrl } from "./types";

export const getBookOfMormonUrls = (): LinksUrl[] => {
  return [
    {
      url: "https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng",
      contentType: "book-of-mormon",
      links: [
        {
          getLinksFromBody: getLinksFromBodyLdsWebsite,
          resultingUrlsType: "content",
          getContentText: getContentTextFromBodyLdsWebsite,
        },
      ],
    },
  ];
};