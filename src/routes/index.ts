const expresss = require("express");
const router = expresss.Router();
const Users = require("../app/model/userSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
import userLogin from "../app/middlewares/authorization";
import authSchema from "../app/middlewares/validations";

// User Login Route
router.post("/login-user", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "user", res);
  })(req, res, next);
});

// Manager Login Route
router.post("/login-manager", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "manager", res);
  })(req, res, next);
});

// Super Admin Login Route
router.post("/login-super-admin", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "super-admin", res);
  })(req, res, next);
});

// HR Login Route
router.post("/login-hr", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "hr", res);
  })(req, res, next);
});

// Employee Login Route
router.post("/login-employee", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "employee", res);
  })(req, res, next);
});

// SEO Login Route
router.post("/login-seo", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "seo", res);
  })(req, res, next);
});

// Content-Writer Login Route
router.post("/login-content-writer", (req: any, res: any, next: any) => {
  passport.authenticate("local", {}, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(400).send({
        message: info.msg,
        user: user,
      });
    }
    userLogin(req, user, "content-writer", res);
  })(req, res, next);
});

// Signup Route
router.post("/signup", async (req: any, res: any) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await Users.findOne({ email: result.email });
    if (doesExist) {
      res.status(404).send(`${result.email} is already been registered`);
    } else {
      const user = new Users(result);
      //Hash Password
      bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(user.password, salt, (err: any, hash: any) => {
          // Store hash in your password DB.
          if (err) throw err;
          user.password = hash;
          user.cPassword = hash;

          //Save User
          user
            .save()
            .then((response: any, err: any) => {
              if (err) {
                res.status(502).send({
                  status: false,
                  message: "there was an error",
                  error: err,
                });
              }

              res.status(200).send({
                status: true,
                message: "User Created",
                id: response._id,
                data: user,
              });
            })
            .catch((err: any) => console.log(err));
        });
      });
    }
  } catch (e: any) {
    res.send(e.details[0].message);
  }
});

router.get(
  "/test/:role",
  passport.authenticate("jwt", {}),
  function (req: any, res: any) {
    Users.find({ role: req.params.role })
      .then((resp: any, err: any) => {
        console.log(resp);
        res.send(resp);
      })

      // Users.findOne({ role: req.params.role })
      //   .then((resp: any, err: any) => {
      //     console.log(resp);
      //     res.send(resp);
      //   })

      //   Users.findById(req.params.id)
      //   .then((res1:any, err:any) => {
      //     if (res1._id.toString() === req.user._id.toString()) {
      //       res.status(200).send({
      //         status: true,
      //         data: res1,
      //         id: res1._id,
      //       });
      //     } else {
      //       res.status(401).send({
      //         status: false,
      //         data: null,
      //       });
      //     }
      //   })

      .catch((err: any) => console.log(err));
  }
);

module.exports = router;
