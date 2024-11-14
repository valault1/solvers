const fs = require("node:fs");

const CONFERENCE_TALKS_URL =
  "https://www.churchofjesuschrist.org/study/general-conference?lang=eng";

//TODO: Make this path relative
const BASE_FILE_PATH = `${__dirname}/`;
const BASE_URL = "https://www.churchofjesuschrist.org";
const CONFERENCE_TALK_URLS_FILE = "conferenceTalkUrls.txt";

const SEPARATOR = "----- NEW TALK -----\n";
const CONFERENCE_TALKS_TEXT_FILE = "conferenceTalkTexts.txt";
const FAILED_CONFERENCE_TALK_URLS = "failedUrls.txt";
const stripHtml = (htmlText) => {
  return htmlText.replace(/<[^>]+>/g, "");
};

const writeFile = async (path, content) => {
  await fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
};

function getAllMatches(string, regex) {
  const matches = [];
  let match;

  // Create a RegExp object with the global flag
  const regexGlobal = new RegExp(regex, "g");

  while ((match = regexGlobal.exec(string)) !== null) {
    matches.push(match[0]); // Push the full match to the array
  }

  return matches;
}

// note: Only month `10` or `4` will probably work.
const getConferenceUrl = (year, month) => {
  return `https://www.churchofjesuschrist.org/study/general-conference/${year}/${month}?lang=eng`;
};
const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

// given a month and year of a general conference, return the urls of the talks
async function getTalkUrls(year, month) {
  // once we get the html of a conference page, we need to find all the talks within that.
  // <script>window.__INITIAL_STATE__=
  const text = await fetchUrl(getConferenceUrl(year, month));
  const encodedText = text
    .split('<script>window.__INITIAL_STATE__="')[1]
    .split('";</script>')[0];

  const plainText = atob(encodedText);
  const obj = JSON.parse(plainText);

  const contentStoreKey = `/eng/general-conference/${year}/${month}`;
  //console.log(obj.reader.contentStore[contentStoreKey].content.body);
  const body = obj?.reader?.contentStore?.[contentStoreKey]?.content?.body;
  const links = getAllMatches(
    body,
    ///\/study\/general\-conference\/2023\/10\/d+/gi
    new RegExp(
      String.raw`study\/general-conference\/${year}\/${month}\/.*lang\=eng`,
      "g"
    )
    ///study\/general-conference\/2023\/10\/\d+.*lang\=eng/gi
  );
  if (!links.length) {
    console.log("No talks found for: ");
    console.log({ year, month, url: getConferenceUrl(year, month), body });
  }
  return links.map((link) => `${BASE_URL}/${link}`);
  // now, we can get the urls, by looking for the pattern:
  // /study/general-conference/2023/10/46waddell?lang=eng
  // exclude the urls that group sessions:
  // /study/general-conference/2023/10/saturday-afternoon-session?lang=eng
}

const getAllTalkUrls = async () => {
  const startTime = new Date();
  const START_YEAR = 1971;
  const END_YEAR = new Date().getFullYear();
  const allLinks = [];

  const allUrlPromises = [];
  for (let year = START_YEAR; year <= END_YEAR; year++) {
    console.log("getting talks from " + year);
    allUrlPromises.push(getTalkUrls(year, "04"));
    allUrlPromises.push(getTalkUrls(year, "10"));
  }
  const allUrlLists = await Promise.all(allUrlPromises);
  for (let urls of allUrlLists) {
    allLinks.push(...urls);
  }
  // remove links to sessions
  const links = allLinks.filter((link) => {
    return !link.includes("session");
  });
  //for (let idx in links) console.log(`${idx} - ${links[idx]}`);
  await fetchContentFromUrlsAndWriteToFile(links);
  console.log(
    `time to query all talks: ${(new Date() - startTime) / 1000} seconds`
  );
};

const processUrl = async (url, failedUrls) => {
  const text = await fetchUrl(url);
  const encodedText = text
    ?.split('<script>window.__INITIAL_STATE__="')[1]
    ?.split('";</script>')[0];
  if (!encodedText) {
    console.log("url didn't work: " + url);
    failedUrls.push(url);
    return undefined;
  }
  const decodedText = atob(encodedText);
  const obj = JSON.parse(decodedText);
  const uri = Object.keys(obj.reader.contentStore)[0];
  const content = obj.reader.contentStore[uri].content;
  const body = content.body;
  const title = content.head["page-meta-social"].pageMeta.title;

  const year = uri.split("/")[3];
  const month = uri.split("/")[4];
  const fileMetadata = { title, year, month };
  const plainText = stripHtml(body);
  return `${SEPARATOR}${JSON.stringify(fileMetadata)}\n${plainText}`;
};

const fetchContentFromUrlsAndWriteToFile = async (urls) => {
  const promises = [];
  const failedUrls = [];
  for (let idx in urls) {
    const url = urls[idx];
    console.log("processing URL #" + idx);
    promises.push(processUrl(url, failedUrls));
  }
  const values = await Promise.all(promises);
  await writeFile(
    `${BASE_FILE_PATH}${CONFERENCE_TALKS_TEXT_FILE}`,
    values.join("\n")
  );
  await writeFile(
    `${BASE_FILE_PATH}${FAILED_CONFERENCE_TALK_URLS}`,
    failedUrls.join("\n")
  );
};

getAllTalkUrls();
