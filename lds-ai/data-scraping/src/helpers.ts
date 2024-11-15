import { promises as fs } from "fs";

export const BASE_FILE_PATH = `${__dirname}/`;

export const writeFile = async (path: string, content: string) => {
  try {
    await fs.writeFile(path, content);
    console.log("successfully wrote file " + path);
  } catch (err) {
    console.error(err);
  }
};

export const stripHtml = (htmlText: string) => {
  return htmlText?.replace(/<[^>]+>/g, "");
};

export const fetchUrl = async (url: string) => {
  try {
    const response = await fetch(url);
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
    (l) => !l.includes("session")
  );

  return matches.map((m) => {
    let strToUse = m;
    if (m.includes("<")) {
      strToUse = m.split('"')[0];
    }
    return `${BASE_URL_LDS_WEBSITE}${strToUse}`;
  });
};

export const getContentTextFromBodyLdsWebsite = (rawBody: string) => {
  const encodedText = rawBody
    ?.split('<script>window.__INITIAL_STATE__="')[1]
    ?.split('";</script>')[0];
  if (!encodedText) return "";
  const decodedText = atob(encodedText);
  const obj = JSON.parse(decodedText);
  const uri = Object.keys(obj.reader.contentStore)[0];
  const content = obj?.reader?.contentStore?.[uri]?.content;
  const body = content?.body;

  // const title = content?.head?.["page-meta-social"]?.pageMeta?.title;
  // const year = uri.split("/")[3];
  // const month = uri.split("/")[4];
  // const fileMetadata = { title, year, month };
  const plainText = stripHtml(body) || "";
  return plainText;
};
