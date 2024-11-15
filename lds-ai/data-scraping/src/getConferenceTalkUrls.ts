import { getAllMatches, stripHtml } from "./helpers";
import { LinksUrl } from "./types";
export const BASE_URL = "https://www.churchofjesuschrist.org/";

// note: Only month `10` or `4` will probably work.
const getConferenceUrl = (year: string, month: string) => {
  return `https://www.churchofjesuschrist.org/study/general-conference/${year}/${month}?lang=eng`;
};

const getConferenceTalkLinksFromConferencePage = (
  year: string,
  month: string
) => {
  return (rawBody: string) => {
    const encodedText = rawBody
      .split('<script>window.__INITIAL_STATE__="')?.[1]
      ?.split('";</script>')?.[0];

    const plainText = atob(encodedText);
    const obj = JSON.parse(plainText);

    const contentStoreKey = `/eng/general-conference/${year}/${month}`;
    const body = obj?.reader?.contentStore?.[contentStoreKey]?.content?.body;

    const regex = new RegExp(
      String.raw`study\/general-conference\/${year}\/${month}\/.*lang\=eng`,
      "g"
    );

    const matches = getAllMatches(body, regex).filter(
      (l) => !l.includes("session")
    );

    return matches.map((m) => `${BASE_URL}${m}`);
  };
};

const getTextFromConferenceTalkUrlBody = (rawBody: string) => {
  const encodedText = rawBody
    ?.split('<script>window.__INITIAL_STATE__="')[1]
    ?.split('";</script>')[0];
  if (!encodedText) return "";
  const decodedText = atob(encodedText);
  const obj = JSON.parse(decodedText);
  const uri = Object.keys(obj.reader.contentStore)[0];
  const content = obj?.reader?.contentStore?.[uri]?.content;
  const body = content?.body;
  const title = content?.head?.["page-meta-social"]?.pageMeta?.title;

  const year = uri.split("/")[3];
  const month = uri.split("/")[4];
  const fileMetadata = { title, year, month };
  const plainText = stripHtml(body);
  return plainText;
};

export const getConferenceTalkSeedUrls = () => {
  const START_YEAR = 1971;
  const END_YEAR = new Date().getFullYear();
  const tocUrls: LinksUrl[] = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    ["04", "10"].forEach((month) => {
      tocUrls.push({
        url: getConferenceUrl(`${year}`, month),
        contentType: "conference-talk",
        links: [
          {
            getLinksFromBody: getConferenceTalkLinksFromConferencePage(
              `${year}`,
              month
            ),
            resultingUrlsType: "content",
            getContentText: getTextFromConferenceTalkUrlBody,
          },
        ],
      });
    });
  }

  return tocUrls;
};
