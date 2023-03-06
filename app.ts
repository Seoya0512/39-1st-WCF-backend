import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./src/routes";

import { globalErrorHandler } from "./src/utils/error";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(router);
  app.use(globalErrorHandler);

  return app;
};

export { createApp };
