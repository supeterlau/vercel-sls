import express from "express";
// import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { v4 } from "uuid";

const app_secret = "8a183f86642b16881fa6f994203e75b6f903a1f6";
const app_id = "2f99dddae9cec17300e9";

const GITHUB_URL = "https://github.com/login/oauth/access_token";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../public")));

app.use(cors({ credentials: true, origin: true }));

app.get("/api/status", (req, res) => {
  res.status(200).send({ status: "ok" });
});

const GITHUB_CALLBACK = "/api/auth/github/callback";

// client: react/app
app.get(GITHUB_CALLBACK, async (req, res) => {
  let url = `${GITHUB_URL}?client_id=${app_id}&client_secret=${app_secret}&code=${req.query.code}`;
  try {
    let resp = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    let data = await resp.json();
    console.log(data);
    res.redirect(`http://localhost:5173?access_token=${data.access_token}`);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
