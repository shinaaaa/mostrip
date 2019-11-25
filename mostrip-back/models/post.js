const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  image: String,
  contents: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  like: Number,
  like_user: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  date: Date,
  email: String
});

const Post = model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    image: Joi.string(),
    contents: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    like: Joi.number(),
    like_user: Joi.array().items(Joi.string()),
    date: Joi.date()
  });
  return schema.validate(post);
}
module.exports = {
  Post,
  validatePost
};
