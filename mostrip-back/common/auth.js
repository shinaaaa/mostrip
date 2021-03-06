const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("../models/user");
const config = require("./jwt_config");

const { ExtractJwt, Strategy } = passportJWT;
const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = () => {
  const strategy = new Strategy(options, async (payload, done) => {
    const user = await User.findById(payload.email);
    if (user) {
      return done(null, {
        email: user.email,
        name: user.name
      });
    } else {
      return done(new Error("user not found"), null);
    }
  });

  passport.use(strategy);
  return {
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      console.log("신영찬");
      return passport.authenticate("jwt", config.jwtSession);
    }
  };
};
