const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const { jwtSecret } = require("../common/jwt_config");
const wrapper = require("../common/wrapper");

const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads"); // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    cb(null, moment().format("YYYYMMDDHHmmss") + "_" + file.originalname); // 저장되는 파일명
  }
});

const upload = multer({ storage: storage }).single("file");

router.post(
  "/",
  upload,
  wrapper(async (req, res, next) => {
    const { image, name, email, password } = req.body;
    console.log(req.body.name);
    if (validateUser(req.body).error) {
      //검증과정 통과 못하면
      res.status(400).json({ result: false });
      next();
      return;
    }
    const saltRound = 10;
    const hashedPW = await bcrypt.hash(password, saltRound);
    const user = new User({
      image: req.file.filename,
      name: req.body.name,
      email: req.body.email,
      password: hashedPW,
      clAss: false
    });
    const saveResult = await user.save();
    res.json({ result: true });
    next();
  })
);

module.exports = router;
