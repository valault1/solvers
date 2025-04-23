import puppeteer from "puppeteer";
import fs from "fs";
// import readline from "readline";
import { runTest } from "./test.js";
import { addToResults, getFinalTransactions } from "./parseJson.js";

// paylod
// operation name: TransactionsPage and TransactionsPageTransactionTable

let results = {};

async function captureHAR() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    // console.log("Intercepted request:", req.url());
    // console.log({ req });
    req.continue();
  });

  page.on("response", async (res) => {
    if (!res.url().includes("graphql")) return;
    console.log("Intercepted res:", res.url());
    try {
      const json = await res.json();

      addToResults(results, json);
    } catch (e) {
      console.log("there was an error - probably a preflight request");
    }
  });

  const har = await page.goto("https://app.rocketmoney.com/transactions");

  // await rl.question("Please enter something: ", (answer) => {
  //   console.log(`You entered: ${answer}`);

  //   // Close the readline interface after the input is received
  //   rl.close();
  // });

  // wait 5 seconds
  const sec = 180;
  console.log(`waiting ${sec} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, sec * 1000));

  // Save HAR to file
  fs.writeFileSync(
    "transactions.txt",
    JSON.stringify(getFinalTransactions(results))
  );

  console.log("HAR saved to network-data.har");

  await browser.close();
}

captureHAR();
//runTest();
