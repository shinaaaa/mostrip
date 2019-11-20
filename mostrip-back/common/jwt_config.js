module.exports = {
  jwtSecret: process.env.TOKEN_KEY || "mostrip",
  jwtSession: {
    session: false
  }
};
