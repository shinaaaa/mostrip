var express = require("express");
var router = express.Router();
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");
const wrapper = require("../common/wrapper");

/* GET home page. */
router.post(
  "/",
  wrapper(async (req, res, next) => {
    let email = req.body.email;
    console.log(email);

    let _id = req.body._id;
    const user = await User.findOne({ _id: _id });
    console.log(user._id);

    const index = user.like_user.indexOf(email);
    console.log("안냥 : ", index);

    if (index == "-1") {
      user.like_user.push(email);
      user.like = user.like + 1;
      if (user.like >= 5) {
        user.clAss = true;
      }
      console.log("좋아유");
      console.log("index : ", user);
      console.log("-------------", user.clAss);

      await user.save();
      res.send({ result: true });
    } else {
      // const newTags = [...img.like_user];
      user.like_user.splice(index, 1);
      user.like = user.like - 1;
      await user.save();
      console.log("안좋아유");
      console.log("unlike : ", user);
      res.send({ result: false });
    }
  })
);

module.exports = router;
