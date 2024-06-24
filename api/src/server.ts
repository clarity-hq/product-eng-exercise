import cors from "cors";
import express from "express";
import { router } from "./endpoint";

const port = 5001;

async function main() {
  const app = express();

  app.use(cors());

  app.use(router);

  app.listen(port);

  console.info(`🚀 Server running on port ${port}`);
}

main();
