import { getBookOfMormonUrls } from "./getBookOfMormonUrls";
import { getConferenceTalkSeedUrls } from "./getConferenceTalkUrls";
import { fetchUrl, writeFile } from "./helpers";
import {
  Content,
  ContentType,
  ContentTypes,
  ContentUrl,
  LinksUrl,
} from "./types";

const BASE_FILE_PATH = `${__dirname}/data/`;
const FAILED_CONFERENCE_TALK_URLS = "failedUrls.txt";
const SEPARATOR = "----- NEW TALK -----\n";
let RETRY_COUNT = 5;

async function processContentType(contentType: ContentType) {
  let linksUrls = [];
  switch (contentType) {
    case "conference-talk":
      linksUrls = getConferenceTalkSeedUrls();
      break;
    case "book-of-mormon": {
      linksUrls = getBookOfMormonUrls();
      console.log({ linksUrls });
    }
  }
  await processUrlsAndWriteResults(linksUrls, contentType);
}

async function processUrlsAndWriteResults(
  linksUrls: LinksUrl[],
  contentType: ContentType
) {
  console.log(`------------------- ${contentType} ------------------------`);
  console.log(
    `found ${linksUrls.length} links urls - processing them to get content urls...`
  );
  let contentUrls = await processLinksUrls(linksUrls);
  console.log(`got ${contentUrls.length} content urls!`);

  let contents: Content[] = [];
  let failCount = 0;
  while (contentUrls.length && failCount < RETRY_COUNT) {
    failCount += 1;
    console.log(`successful contents so far: ${contents.length} `);
    console.log(`Fetching ${contentUrls.length} urls - attempt #${failCount}`);

    const newContents = await processContentUrls(contentUrls);
    const successfulContents = newContents.filter((c) => !!c.text);

    contents.push(...successfulContents);
    const failedUrls = newContents.filter((c) => !c.text).map((c) => c.url);
    contentUrls = contentUrls.filter((url) => failedUrls.includes(url.url));
  }
  const fileContents = contents
    .filter((c) => !!c.text)
    .map((c) => c.text)
    .join(SEPARATOR);

  console.log(`Num failed urls: ${contentUrls.length}`);
  await writeFile(`${BASE_FILE_PATH}${contentType}-success.txt`, fileContents);
  if (contentUrls.length) {
    await writeFile(
      `${BASE_FILE_PATH}${FAILED_CONFERENCE_TALK_URLS}-error`,
      contentUrls.map((u) => u.url).join("\n")
    );
  }
}

async function processContentUrls(
  contentUrls: ContentUrl[]
): Promise<Content[]> {
  const promises = contentUrls.map(processContentUrl);
  const contents = await Promise.all(promises);
  return contents;
}

async function processContentUrl(contentUrl: ContentUrl): Promise<Content> {
  const rawBody = await fetchUrl(contentUrl.url);
  //console.log(contentUrl.url);
  if (!rawBody)
    return {
      text: "",
      url: contentUrl.url,
      contentType: contentUrl.contentType,
      metadata: "temp",
    };
  const contentText = contentUrl.getContentText(rawBody);
  return {
    text: contentText,
    contentType: contentUrl.contentType,
    metadata: "temp",
    url: contentUrl.url,
  };
}

async function processLinksUrls(linksUrls: LinksUrl[]): Promise<ContentUrl[]> {
  const promises = linksUrls.map((link) => processLinksUrl(link));
  const contentLists = await Promise.all(promises);
  let result: ContentUrl[] = [];
  contentLists.forEach((list) => result.push(...list));
  return result;
}

async function processLinksUrl(linksUrl: LinksUrl): Promise<ContentUrl[]> {
  //console.log({ linksUrl });
  const rawBody = await fetchUrl(linksUrl.url);
  if (!rawBody) return [];
  const resultUrls: ContentUrl[] = [];
  for (let sublink of linksUrl.links) {
    const urls = sublink.getLinksFromBody(rawBody);
    const contentUrls: ContentUrl[] = urls.map((url) => ({
      contentType: linksUrl.contentType,
      url,
      getContentText: sublink.getContentText,
    }));
    resultUrls.push(...contentUrls);
  }

  return resultUrls;
}

async function main() {
  await processContentType("book-of-mormon");
  await processContentType("conference-talk");
}

main();
