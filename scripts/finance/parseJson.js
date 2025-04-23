export const getAccounts = (json) => {
  const jsonString = JSON.stringify(json);
  if (!jsonString.includes("AccountConnection")) return undefined;
  console.log("Found the accounts!");
  const fullAccounts = json.data.viewer.accounts.edges;
  const accounts = fullAccounts.map((a) => ({
    ...a.node,
  }));

  const accountsById = accounts.reduce((acc, a) => {
    acc[a.id] = { ...a };
    return acc;
  }, {});
  //console.log(accountsById);
  return accountsById;
};

export const getTransactions = (json) => {
  const jsonString = JSON.stringify(json);
  if (!jsonString.includes("TransactionConnection")) return undefined;
  console.log("found the transactions!");
  const fullTransactions = json.data.viewer.transactions.edges.map(
    ({ node }) => ({
      id: node.id,
      shortName: node.shortName,
      amount: node.amount,
      date: node.date,
      categoryLabel: node.category.label,
      accountId: node.account.id,
      ignoredFrom: node.ignoredFrom,
    })
  );
  //console.log(fullTransactions);
  return fullTransactions;
};

export const addToResults = (result, json) => {
  const accounts = getAccounts(json);
  if (accounts) {
    result.accountsById = accounts;
  }
  const transactions = getTransactions(json);
  if (transactions) {
    result.transactions = transactions;
  }
};

export const getFinalTransactions = ({ transactions, accountsById }) => {
  return transactions.map((t) => ({
    ...t,
    accountName: accountsById[t.accountId].name,
    institutionName: accountsById[t.accountId].institution.name,
  }));
};
