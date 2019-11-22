var express = require("express");
var router = express.Router();
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");
const wrapper = require("../common/wrapper");

/* GET home page. */
router.post(
  "/",
  wrapper(async (req, res, next) => {
    let cnt = 0;
    let id = req.body._id;

    const img = await Post.findOne({ _id: id });

    let email = req.body.email;
    console.log(email);

    const user = await User.findOne({ email });
    console.log(user._id);

    img.like_user.indexOf(email);
    const index = img.like_user.indexOf(user._id);
    console.log(index);
    if (img.like_user.indexOf(user._id) == "-1") {
      img.like_user.push(user._id);
      await img.save();
      img.like = img.like + 1;
      console.log("좋아유");

      console.log("------------------------", img);
    } else {
      // const newTags = [...img.like_user];
      img.like_user.splice(index, 1);
      img.like = img.like - 1;
      await img.save();
      console.log("안좋아유");
      res.send("꺼지세요");
    }
  })
);

module.exports = router;
