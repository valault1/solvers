import { promises as fs } from "fs";
import { ContentType } from "./types";
import sanitizeHtml from "sanitize-html";

export const contentTypesToProcess = ["book-of-mormon", "conference-talk"];
const BASE_FILE_PATH = `${__dirname}/data/`;
export const SEPARATOR = "----- NEW CONTENT -----\n";

export const getFilePath = (contentType: string, type: "success" | "error") => {
  return `${BASE_FILE_PATH}${contentType}-${type}.txt`;
};

export const writeFile = async (path: string, content: string) => {
  try {
    await fs.writeFile(path, content, { encoding: "ascii" });
    console.log("successfully wrote file " + path);
  } catch (err) {
    console.error(err);
  }
};

export const stripHtml = (htmlText: string) => {
  return sanitizeHtml(htmlText);
  return htmlText?.replace(/<[^>]+>/g, "");
};

export const fetchUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    //console.log({ headers: response.headers.get("Content-Type") });
    return await response.text();
  } catch (error) {
    //console.error("There has been a problem with your fetch operation:", error);
  }
};

export const getAllMatches = (str: string, regex: RegExp) => {
  const matches = [];
  let match;

  // Create a RegExp object with the global flag
  const regexGlobal = new RegExp(regex, "g");

  while ((match = regexGlobal.exec(str)) !== null) {
    matches.push(match[0]); // Push the full match to the array
  }

  return matches;
};

export const BASE_URL_LDS_WEBSITE = "https://www.churchofjesuschrist.org/";

export const getLinksFromBodyLdsWebsite = (rawBody: string) => {
  const encodedText = rawBody
    .split('<script>window.__INITIAL_STATE__="')?.[1]
    ?.split('";</script>')?.[0];

  const plainText = atob(encodedText);

  const obj = JSON.parse(plainText);

  const contentStoreKey = Object.keys(obj?.reader?.contentStore)[0];
  const body = obj?.reader?.contentStore?.[contentStoreKey]?.content?.body;
  const regex = new RegExp(String.raw`study.*lang\=eng`, "g");

  const matches = getAllMatches(body, regex).filter(
    (l) => !l.includes("session") && !l.includes("_contents")
  );

  return matches.map((m) => {
    let strToUse = m;
    if (m.includes("<")) {
      strToUse = m.split('"')[0];
    }
    return `${BASE_URL_LDS_WEBSITE}${strToUse}`;
  });
};

export const getContentTextFromBodyLdsWebsite = (
  rawBody: string,
  contentType: ContentType,
  url: string
) => {
  const encodedText = rawBody
    ?.split('<script>window.__INITIAL_STATE__="')[1]
    ?.split('";</script>')[0];
  if (!encodedText) return "";
  const decodedText = atob(encodedText);
  const obj = JSON.parse(decodedText);
  const uri = Object.keys(obj.reader.contentStore)[0];
  const content = obj?.reader?.contentStore?.[uri]?.content;

  const body = content?.body;
  // console.log(body);
  // console.log(
  //   "--------------------------------------------------------------------------------------------------------"
  // );
  // console.log(
  //   "--------------------------------------------------------------------------------------------------------"
  // );
  // console.log(rawBody);
  // throw new Error();

  let fileMetadata: any = {};
  if (contentType === "conference-talk") {
    const title = content?.head?.["page-meta-social"]?.pageMeta?.title;
    const year = uri?.split("/")[3];
    const month = uri?.split("/")[4];
    fileMetadata = { title, year, month };
  } else {
    const title = content?.head?.["page-meta-social"]?.pageMeta?.title;
    fileMetadata.title = title;
  }

  fileMetadata.url = url;
  fileMetadata.contentType = contentType;

  // const fileMetadata = { title, year, month };
  const plainText = stripHtml(body) || "";
  return `${JSON.stringify(fileMetadata)}\n${plainText}`;
};
