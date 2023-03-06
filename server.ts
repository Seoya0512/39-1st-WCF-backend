require("dotenv").config();

import { createApp } from "./app";
import { appDataSource } from "./src/models/dataSource";

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;
  await appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
