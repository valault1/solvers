import { getConferenceTalkSeedUrls } from "./getConferenceTalkUrls";
import { getStandardWorksUrls } from "./getStandardWorksUrls";
import {
  contentTypesToProcess,
  fetchUrl,
  getFilePath,
  SEPARATOR,
  writeFile,
} from "./helpers";
import { Content, ContentType, ContentUrl, LinksUrl } from "./types";

let RETRY_COUNT = 5;

async function processContentType(contentType: ContentType) {
  let linksUrls: LinksUrl[] = [];
  switch (contentType) {
    case "conference-talk":
      linksUrls = getConferenceTalkSeedUrls();
      break;
    case "book-of-mormon": {
      linksUrls = getStandardWorksUrls();
    }
  }
  await processUrlsAndWriteResults(linksUrls);
}

async function processUrlsAndWriteResults(linksUrls: LinksUrl[]) {
  const contentType = linksUrls[0].contentType;
  console.log(`------------------- ${contentType} ------------------------`);
  console.log(
    `found ${linksUrls.length} links urls - processing them to get content urls...`
  );
  let allContentUrls = await processLinksUrls(linksUrls);
  console.log(`got ${allContentUrls.length} content urls!`);

  let contents: Content[] = [];
  let failCount = 0;
  let MAX_ATTEMPTS_AT_ONCE = 2000;
  const MINIMUM_ATTEMPTS_NEEDED = Math.ceil(
    allContentUrls.length / MAX_ATTEMPTS_AT_ONCE
  );
  const attemptsToTry = RETRY_COUNT + MINIMUM_ATTEMPTS_NEEDED;
  let contentUrls = allContentUrls.slice(0, MAX_ATTEMPTS_AT_ONCE);
  allContentUrls = allContentUrls.slice(contentUrls.length);
  while (contentUrls.length && failCount < attemptsToTry) {
    let startTime = new Date();
    failCount += 1;
    console.log(`successful contents so far: ${contents.length} `);
    console.log(
      `Fetching ${contentUrls.length} urls - attempt #${failCount} / ${attemptsToTry}`
    );
    console.log(`total urls left to fetch: ${allContentUrls.length}`);

    const newContents = await processContentUrls(contentUrls);
    const successfulContents = newContents.filter((c) => !!c.text);

    contents.push(...successfulContents);
    const failedUrls = newContents.filter((c) => !c.text).map((c) => c.url);
    contentUrls = contentUrls.filter((url) => failedUrls.includes(url.url));
    contentUrls.push(...allContentUrls.slice(0, successfulContents.length));
    allContentUrls = allContentUrls.slice(successfulContents.length);
    console.log(
      `total time for that set of calls: ${
        (new Date().getTime() - startTime.getTime()) / 1000
      } s`
    );
  }
  const fileContents = contents
    .filter((c) => !!c.text)
    .map((c) => c.text)
    .join(SEPARATOR);

  console.log(`Num failed urls: ${contentUrls.length}`);
  await writeFile(getFilePath(contentType, "success"), fileContents);
  if (contentUrls.length) {
    await writeFile(
      getFilePath(contentType, "error"),
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
  const contentText = contentUrl.getContentText(
    rawBody,
    contentUrl.contentType,
    contentUrl.url
  );
  return {
    text: contentText,
    contentType: contentUrl.contentType,
    metadata: "temp",
    url: contentUrl.url,
  };
}

async function processLinksUrls(linksUrls: LinksUrl[]): Promise<ContentUrl[]> {
  const startTime = new Date();
  const promises = linksUrls.map((link) => processLinksUrl(link));
  const contentLists = await Promise.all(promises);
  let result: ContentUrl[] = [];
  const failedUrls: string[] = [];
  contentLists.forEach((list, idx) => {
    if (!list.length) failedUrls.push(linksUrls[idx].url);
    result.push(...list);
  });
  if (failedUrls.length) {
    failedUrls.forEach((url) => console.log("failed to get links from url: "));
  }
  console.log(
    `total time to process links urls: ${
      (new Date().getTime() - startTime.getTime()) / 1000
    } s`
  );
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
  contentTypesToProcess.forEach(
    async (type) => await processContentType(type as ContentType)
  );
}

main();
