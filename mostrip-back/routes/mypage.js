var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const wrapper = require("../common/wrapper");

const { User } = require("../models/user");

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

/* GET home page. */
router.post(
  "/",
  upload,
  wrapper(async (req, res, next) => {
    const { file, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!req.file) {
      const saltRound = 10;
      const hashedPW = await bcrypt.hash(password, saltRound);

      user.password = hashedPW;

      await user.save();
    } else if (req.password === "") {
      user.image = req.file.filename;
      await user.save();
    }
    console.log("req.body: ", req.body);

    // user.image = req.file.filename;
    // user.password = hashedPW;
    // console.log(user);
    // const saveResult = await user.save();
    res.json({ result: true });
    next();
  })
);

module.exports = router;
