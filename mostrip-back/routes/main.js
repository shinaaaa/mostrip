var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { Post, validatePost } = require("../models/post");
const wrapper = require("../common/wrapper");

router.get(
  "/",
  wrapper(async (req, res, next) => {
    const img = await Post.find().select("image");
    console.log(img);
    if (img) {
      res.json({ result: img });
    } else {
      res.json({ result: false });
    }
    // next();
  })
);

module.exports = router;
