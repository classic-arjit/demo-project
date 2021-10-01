const LocalStrategy = require("passport-local").Strategy;
const Userss = require("../model/userSchema");
const bcrypts = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function (passport: any) {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:
          "kBoaeMlNFqifswTPxVar6DEXzDTFsEd51SW6UzXP8AeE3D0aIufTBbxnLVIdNEy",
      },
      function (jwt_payload: any, done: any) {
        Userss.findOne({ _id: jwt_payload.id }, function (err: any, user: any) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        });
      }
    )
  );

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },

      (req: any, email: any, password: any, done: any) => {
        //Match User

        Userss.findOne({ email: email })
          .then((user: any) => {
            if (!user) {
              return done(null, false, { msg: "That Email is not registered" });
            }
            //Match Password
            bcrypts.compare(
              password,
              user.password,
              (err: any, isMatch: any) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { msg: "Password Incorrect" });
                }
              }
            );
          })
          .catch((e: any) => console.log(e));
      }
    )
  );
    passport.serializeUser((user:any, done:any) => {
      done(null, user.id);
    });

    passport.deserializeUser((id:any, done:any) => {
      User.findById(id, function (err:any, user:any) {
        done(err, user);
      });
    });
};
