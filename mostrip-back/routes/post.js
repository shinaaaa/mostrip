const express = require("express");
const router = express.Router();
const auth = require("../common/auth")();
const { Post, validatePost } = require("../models/post");
const { Tag } = require("../models/tag");
const wrapper = require("../common/wrapper"); // async await 함수를 사용하다보면 error가 발생하게 되는데 얘가 대신 모든 에러를 캐치함.
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

const upload = multer({ storage: storage }).single("image");

router.post(
  "/",
  upload,
  //auth.authenticate(), // 인증에 관한 것.
  wrapper(async (req, res, next) => {
    console.log(req.body);
    console.log(JSON.stringify(req.body.tags));

    const { image, contents, tags } = req.body;

    const post = new Post({
      image: req.file.filename,
      contents: req.body.contents,
      tags: tags.split(","),
      like: 0,
      like_user: [],
      date: new Date()
    });
    await post.save();
    //여기까지가 포스트만 작성
    //이제부터는 tag에다가 업데이트!
    for (const tag_id of tags.split(",")) {
      console.log(tag_id);
      const tag = await Tag.findById(tag_id);
      tag.posts.push(post._id);
      await tag.save();
    }
    res.json({ result: true });
    next();
  })
);

router.get(
  "/",
  wrapper(async (req, res, next) => {
    const { tag, page = "1" } = req.query;
    const skip = parseInt(page) * 5 - 5;

    if (tag) {
      const posts = await Post.find()
        .where("tags")
        .in(tag)
        .skip(skip)
        .limit(5)
        .sort("-date")
        .populate("tags");
      res.json({ posts });
    } else {
      const posts = await Post.find()
        .limit(5)
        .skip(skip)
        .sort("-date")
        .populate("tags");
      res.json({ posts });
    }
    next();
  })
);

router.get(
  "/:id",
  wrapper(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate("tags");
    res.json(post);
    next();
  })
);

router.patch(
  "/:id",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    if (!req.user.admin) {
      res.json({ error: "unauthorized" });
      next();
      return;
    }
    await Post.updateOne({ _id: req.params.id }, req.body);
    res.json({ result: true });
    next();
  })
);

router.delete(
  "/:id",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    if (!req.user.admin) {
      res.json({ error: "unauthorized" });
      next();
      return;
    }
    await Post.deleteOne({ _id: req.params.id });
    res.json({ result: true });
    next();
  })
);
module.exports = router;
