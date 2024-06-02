const runFunctionNonBlocking = (
  fn: Function,
  eventLoopPollingIntervalMs = 100
) => {
  const interval = setInterval(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }, eventLoopPollingIntervalMs);
  setTimeout(() => {
    fn().then(() => clearInterval(interval));
  }, 0);
};
