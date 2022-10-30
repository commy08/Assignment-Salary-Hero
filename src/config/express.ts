import express from "express";
import helmet from "helmet";
import cors from "cors";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { PROJECT_PORT } from "./dotenv";

import { swaggerOptions } from "./swagger";
import logger from "../services/logger.service";

export default () => {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  expressJSDocSwagger(app)(swaggerOptions);

  const port = PROJECT_PORT || 8000; // get from ENV

  app.listen(port, () => {
    logger.logInfo(`Application is running on port ${port}.`);
  });

  return app;
};
