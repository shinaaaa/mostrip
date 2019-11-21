var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose"); // MongoDB에 접근하기 위한 것
const Helmet = require("helmet"); // 보안 공격 막기 위한 것
const auth = require("./common/auth")();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const joinRouter = require("./routes/join");
const emailRouter = require("./routes/email");
const postRouter = require("./routes/post");
const tagRouter = require("./routes/tag");
const mainRouter = require("./routes/main");

var app = express();

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/mostrip";

app.use(Helmet());
app.use(cors());

// Middleware
app.use((req, res, next) => {
  //next를 반드시 써줘야 함.
  mongoose
    .connect(dbURI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => next())
    .catch((e) => next(e));
});

app.use(auth.initialize());
app.use(express.json());

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth/login", loginRouter);
app.use("/auth/join", joinRouter);
app.use("/auth/email", emailRouter);
app.use("/api/post", postRouter);
app.use("/api/tag", tagRouter);
app.use("/api/main", mainRouter);

// 이것까지 실행해야 하기 때문에 위에서 next를 써줘야한다. 그래야 여기까지 실행함.
app.use(() => mongoose.disconnect());

console.log("Listening port 3000...");

module.exports = app;
