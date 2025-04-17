import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));


//  test route: 
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
