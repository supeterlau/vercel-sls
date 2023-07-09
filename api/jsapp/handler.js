// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app_secret = "8a183f86642b16881fa6f994203e75b6f903a1f6";
const app_id = "2f99dddae9cec17300e9";

const GITHUB_URL = "https://github.com/login/oauth/access_token";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
  res.status(200).send({ message: "ok" });
});

app.get("/status", (req, res) => {
  res.status(200).send({ status: "ok" });
});

const GITHUB_CALLBACK = "/auth/github/callback";

// clien: preact/app
app.get(GITHUB_CALLBACK, async (req, res) => {
  let url = `${GITHUB_URL}?client_id=${app_id}&client_secret=${app_secret}&code=${req.query.code}`;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    let data = await res.text();
    console.log(data);
    res.redirect(`http://localhost:5173?access_token=${data.access_token}`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
