import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./app/config";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const whiteList = [" http://localhost:3000", "https://example.com"]; // Add your allowed origins here
const corsOptions = {
  origin:
    config.ENVIRONMENT === "production"
      ? function (origin: any, callback: any) {
          if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        }
      : "*",
};
app.use(cors(corsOptions));

//  test route:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes:
app.use("/api/v1", router);

// not found middleware:
app.use(notFound);

// global error handler:
app.use(globalErrorHandler);

export default app;
