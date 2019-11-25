const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

// 몽구스 에선 Schema라는 것을 먼저 생성해야함.
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  admin: { type: Boolean, default: false },
  image: String,
  clAss: Boolean,
  like: Number,
  like_user: [{ type: mongoose.Types.ObjectId, ref: "users" }]
});

// model로 User테이블에 접근이 가능함.
const User = model("User", userSchema);
// 사용자 입력값 검사
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  });
  return schema.validate(user);
}
module.exports = {
  User,
  validateUser
};
