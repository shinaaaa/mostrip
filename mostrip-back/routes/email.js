var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const wrapper = require("../common/wrapper");

router.get(
  "/",
  wrapper(async (req, res, next) => {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ result: false });
    } else {
      res.json({ result: true });
    }
    // next();
  })
);

module.exports = router;
