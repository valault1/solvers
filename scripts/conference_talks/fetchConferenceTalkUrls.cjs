const fs = require("node:fs/promises");
const URLS_FILE_PATH = `/Users/valault/Programming/solvers/scripts/conference_talks/conferenceTalkUrls.txt`;
const SEPARATOR = "----- NEW TALK -----\n";
const CONFERENCE_TALKS_TEXT_FILE = "conferenceTalkTexts.txt";
const stripHtml = (htmlText) => {
  return htmlText.replace(/<[^>]+>/g, "");
};

async function readFileAsText(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const writeFile = async (content) => {
  fs.writeFile(
    `/Users/valault/Programming/solvers/scripts/conference_talks/${CONFERENCE_TALKS_TEXT_FILE}`,
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

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

const processUrl = async (url) => {
  const text = await fetchUrl(url);
  const encodedText = text
    ?.split('<script>window.__INITIAL_STATE__="')[1]
    ?.split('";</script>')[0];
  if (!encodedText) {
    console.log("url didn't work: " + url);
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

const main = async () => {
  const urlsText = await readFileAsText(URLS_FILE_PATH);
  const urls = urlsText.split("\n");
  const promises = [];
  for (let idx in urls) {
    const url = urls[idx];
    console.log("processing URL #" + idx);
    promises.push(processUrl(url));
  }
  Promise.all(promises).then((values) => {
    writeFile(values.join("\n"));
  });
};

main();
