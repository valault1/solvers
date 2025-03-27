import express from "express";
import cors from "cors";

const server = express();

var prod_whitelist = [
  "https://solvers.valault.com",
  "https://solvers.valault.com/",
  "https://web-wordle-solver-ca3be.web.app/",
  "https://web-wordle-solver-ca3be.web.app",
];

var corsOptions = {
  origin: function (origin, callback) {
    return callback(null, true);
  },
};

server.use(cors(corsOptions));
server.use(express.json());
const startServer = () => {
  const app = server.listen(1213, function () {
    const address = app.address();
    const ip = address.address === "::" ? "localhost" : address.address;
    console.log(`server has started listening on ${ip}:${address.port}`);
  });
};

server.get("/test", async (req, res) => {
  const startTime = new Date().getTime();
  const { numOperations } = req.query;
  const num = Number(numOperations);

  console.log(`got test for ${num} operations`);

  for (let i = 0; i < num; i++) {
    const a = 1 + 1;
  }
  console.log("time to run: ", new Date().getTime() - startTime);
  res.send({ result: "hello world!" });
});

startServer();
