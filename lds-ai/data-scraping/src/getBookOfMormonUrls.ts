import { BASE_URL } from "./getConferenceTalkUrls";
import { getAllMatches, stripHtml } from "./helpers";
import { LinksUrl } from "./types";

const getLinksFromBody = (rawBody: string) => {
  const encodedText = rawBody
    .split('<script>window.__INITIAL_STATE__="')?.[1]
    ?.split('";</script>')?.[0];

  const plainText = atob(encodedText);

  const obj = JSON.parse(plainText);

  const contentStoreKey = `/eng/scriptures/bofm`;
  const body = obj?.reader?.contentStore?.[contentStoreKey]?.content?.body;

  const regex = new RegExp(String.raw`study.*lang\=eng`, "g");

  const matches = getAllMatches(body, regex).filter(
    (l) => !l.includes("session")
  );

  return matches.map((m) => `${BASE_URL}${m}`);
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

export const getBookOfMormonUrls = (): LinksUrl[] => {
  return [
    {
      url: "https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng",
      contentType: "book-of-mormon",
      links: [
        {
          getLinksFromBody: getLinksFromBody,
          resultingUrlsType: "content",
          getContentText: getTextFromConferenceTalkUrlBody,
        },
      ],
    },
  ];
};
