const fs = require("node:fs");

const CONFERENCE_TALKS_URL =
  "https://www.churchofjesuschrist.org/study/general-conference?lang=eng";

const BASE_URL = "https://www.churchofjesuschrist.org";
const CONFERENCE_TALK_URLS_FILE = "conferenceTalkUrls.txt";

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
const getUrl = (year, month) => {
  return `https://www.churchofjesuschrist.org/study/general-conference/${year}/${month}?lang=eng`;
};
const fetchUrl = async (year, month) => {
  try {
    const response = await fetch(getUrl(year, month));
    return await response.text();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

// given a month and year of a general conference, return the urls of the talks
async function getTalkUrls(year, month) {
  // once we get the html of a conference page, we need to find all the talks within that.
  // <script>window.__INITIAL_STATE__=
  const text = await fetchUrl(year, month);
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
    console.log({ year, month });
  }
  return links.map((link) => `${BASE_URL}/${link}`);
  // now, we can get the urls, by looking for the pattern:
  // /study/general-conference/2023/10/46waddell?lang=eng
  // exclude the urls that group sessions:
  // /study/general-conference/2023/10/saturday-afternoon-session?lang=eng
}

const getAllTalkUrls = async () => {
  const START_YEAR = 1971;
  const END_YEAR = new Date().getFullYear();
  const allLinks = [];
  for (let year = START_YEAR; year <= END_YEAR; year++) {
    const aprilUrls = await getTalkUrls(year, "04");
    allLinks.push(...aprilUrls);
    allLinks.push(...(await getTalkUrls(year, "10")));
  }
  // remove links to sessions
  const links = allLinks.filter((link) => {
    return !link.includes("session");
  });
  for (let idx in links) console.log(`${idx} - ${links[idx]}`);
  const content = links.join("\n");
  fs.writeFile(
    `/Users/valault/Programming/solvers/scripts/conference_talks/${CONFERENCE_TALK_URLS_FILE}`,
    content,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    }
  );
};

//getAllTalkUrls();
