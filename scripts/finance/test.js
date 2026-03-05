import { addToResults, getFinalTransactions } from "./parseJson.js";
import { TransactionsPageTransactionTableJSON } from "./mockTransactions.js";
import { TransactionsPageJSON } from "./mockAccounts.js";
let results = {};
export const runTest = () => {
  addToResults(results, TransactionsPageTransactionTableJSON);
  addToResults(results, TransactionsPageJSON);
  console.log(getFinalTransactions(results));
};
