import "./config/dotenv";
import express from "./config/express";
import router from "./routes";
import { exampleSequelize } from "./config/database";

const main = () => {
  try {
    exampleSequelize.sync();

    const app = express();
    app.use("/api", router);

    app.get("/health-check", (_req, res) => {
      try {
        exampleSequelize.authenticate();
      } catch (error) {
        res.status(500).send({
          status: "DOWN",
          message: "Unable to connect Database",
        });
      }

      res.json({ status: "UP" });
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

main();
