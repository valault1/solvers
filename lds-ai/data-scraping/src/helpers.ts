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
  return htmlText.replace(/<[^>]+>/g, "");
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
