import {
  getContentTextFromBodyLdsWebsite,
  getLinksFromBodyLdsWebsite,
} from "./helpers";
import { LinksUrl } from "./types";

// note: Only month `10` or `4` will probably work.
const getConferenceUrl = (year: string, month: string) => {
  return `https://www.churchofjesuschrist.org/study/general-conference/${year}/${month}?lang=eng`;
};

export const getConferenceTalkSeedUrls = () => {
  const START_YEAR = 1971;
  const END_YEAR = new Date().getFullYear();
  const linksUrls: LinksUrl[] = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    ["04", "10"].forEach((month) => {
      linksUrls.push({
        url: getConferenceUrl(`${year}`, month),
        contentType: "conference-talk",
        links: [
          {
            getLinksFromBody: getLinksFromBodyLdsWebsite,
            resultingUrlsType: "content",
            getContentText: getContentTextFromBodyLdsWebsite,
          },
        ],
      });
    });
  }

  return linksUrls;
};
