const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");
const { jwtSecret } = require("../common/jwt_config");
const wrapper = require("../common/wrapper");

router.post(
  "/",
  wrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.json({ result: false });
      next();
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      //토큰을 만들어 줍시다!
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          admin: user.admin
        },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res.json({ result: true, token, admin: user.admin });
      next();
    } else {
      res.json({ result: false });
      next();
    }
  })
);

module.exports = router;
