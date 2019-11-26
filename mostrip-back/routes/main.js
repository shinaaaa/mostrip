var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { Post, validatePost } = require("../models/post");
const wrapper = require("../common/wrapper");

router.get(
  "/",
  wrapper(async (req, res, next) => {
    let skip = req.query.page * 5;
    console.log("skip:", skip);
    const img = await Post.find()
      .select("image")
      .select("comments")
      .select("contents")
      .limit(skip)
      .sort("-date");
    console.log(img);
    console.log("length:", img.length);
    if (skip > img.length + 5) {
      res.json({ result: false });
    }
    if (img) {
      res.json({ result: img });
    } else {
      res.json({ result: false });
    }
    // next();
  })
);

router.get(
  "/:page",
  wrapper(async (req, res, next) => {
    console.log(req.page);
    let skip = parseInt(req.query.page) * 5;
    console.log(skip);
    const img = await Post.find()
      .select("image")
      .select("comments")
      .limit(skip)
      .sort("-date");
    console.log(img);
    if (img) {
      res.json({ result: img });
    } else {
      res.json({ result: false });
    }
    next();
  })
);

module.exports = router;
