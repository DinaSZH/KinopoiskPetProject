const passport = require("passport");
const User = require("../auth/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// CLIEND_ID: 985317718048-2abmnvem4b082s3ll7u4f3af2hh9p490.apps.googleusercontent.com
// CLIENT_SECRET:  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
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          if (user.password) {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                return done(err);
              }
              if (result) {
                return done(null, user);
              }
            });
          } else {
            return done("User not found");
          }
        })
        .catch((e) => {
          return done(e);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "985317718048-2abmnvem4b082s3ll7u4f3af2hh9p490.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8001/api/auth/google",
      scope: ["openid", "email", "profile"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.find({ googleId: profile.id });
      console.log(user);
      console.log(profile);
      const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value,
      }).save();

      return cb(null, newUser);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});
