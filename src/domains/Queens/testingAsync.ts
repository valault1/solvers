const fibAsync = async (n: number) => {
  let lastTimeCalled = Date.now();

  let a = BigInt(n),
    b = BigInt(n),
    sum,
    i = n - 2;
  while (i-- > 0) {
    sum = a + b;
    a = b;
    b = sum;
    if (Date.now() - lastTimeCalled > 15) {
      // Do we need to poll the eventloop?
      lastTimeCalled = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 0)); // do that
    }
  }
  return b;
};

let ticks = 0;

console.warn("Calulation started");

fibAsync(1000000)
  .then((v) => console.log(`Ticks: ${ticks}\nResult: ${v}`), console.warn)
  .finally(() => {
    clearTimeout(timer);
  });

const timer = setInterval(
  () => console.log("timer tick - eventloop is not freezed", ticks++),
  0
);
