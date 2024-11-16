import { ChromaClient } from "chromadb";
import { promises as fs } from "fs";
import { Content } from "./types";
import { contentTypesToProcess, getFilePath, SEPARATOR } from "./helpers";

const client = new ChromaClient({ path: "http://localhost:8000" });
const COLLECTION_NAME = "content";

const filePaths = contentTypesToProcess.map((type) =>
  getFilePath(type, "success")
);

const addContentsToDb = async (contents: Content[]) => {
  const collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
  });
  const PAGE_SIZE = 100;
  for (let i = 0; i < contents.length / PAGE_SIZE; i++) {
    const startTime = new Date();

    const startIdx = i * PAGE_SIZE;
    const endIdx = (i + 1) * PAGE_SIZE;
    console.log(`inserting from ${startIdx} to ${endIdx}`);
    const contentsPage = contents.slice(startIdx, endIdx);
    await collection.upsert({
      documents: contentsPage.map((c) => c.text),
      ids: contentsPage.map(
        (content, i) => `${content.contentType}-${i + startIdx}`
      ),
      metadatas: contentsPage.map((c) => c.metadata),
    });

    const timeTaken = (new Date().getTime() - startTime.getTime()) / 1000;
    const timeLeft = Math.floor(
      (timeTaken * (contents.length - endIdx)) / PAGE_SIZE
    );
    console.log(
      `inserted document ${endIdx} / ${contents.length} in ${timeTaken} s`
    );
    console.log(`projected time left: ${timeLeft} s`);
  }
};

const processFile = async (filePath: string) => {
  const fileContent = (await fs.readFile(filePath)).toString();
  const contents = fileContent.split(SEPARATOR).map((text) => {
    const metadata = JSON.parse(text.split("\n")[0]);
    const finalText = text.split("\n").slice(1).join("\n");
    return {
      text: finalText,
      url: metadata?.url,
      contentType: metadata.contentType,
      metadata: metadata,
    };
  });
  console.log(`adding ${contents.length} contents to DB`);
  console.log(contents[0]);
  await addContentsToDb(contents);
  console.log("finished adding contents!");
};

const main = async () => {
  // await client.deleteCollection({
  //   name: COLLECTION_NAME,
  // });
  for (let filePath of filePaths) {
    await processFile(filePath);
  }

  const searchText = "Gadianton";
  const shouldRunQuery = true;
  if (shouldRunQuery) {
    const collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
    });

    const results = await collection.query({
      queryTexts: searchText, // Chroma will embed this for you
      nResults: 10, // how many results to return
    });
    console.log(Object.keys(results));
    console.log(results.metadatas);
  }
};

main();
