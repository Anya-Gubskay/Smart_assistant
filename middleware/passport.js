const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const User = require("../models/user");

const options = {
  // we will take the token that will be located in the headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};
// If the token is in the Header, then continue working and give an answer to the user,
// if not, then the user must register
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        // userId take from token
        const user = await User.findById(payload.userId).select("email id");

        if (user) {
          done(null, user);
        } else {
          // the user was not found and therefore we do not add data to the request
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
