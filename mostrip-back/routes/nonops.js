var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const wrapper = require("../common/wrapper");

router.get(
  "/",
  wrapper(async (req, res, next) => {
    let skip = req.query.page * 5;
    console.log("skip:", skip);
    const img = await User.find({ clAss: false })
      .select("image")
      .limit(skip)
      .sort("-date");
    // console.log(img);
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
    const img = await User.find()
      .select("image")
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
