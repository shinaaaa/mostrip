var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send({ ㄷㅣ지몬: "아구몬" });
});

module.exports = router;
