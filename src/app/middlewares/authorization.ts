const jwt = require("jsonwebtoken");

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */

const userLogin = (req: any, user: any, role: any, res: any) => {
  // We will check the role
  req.login(user, {}, (err: any) => {
    if (user.role !== role) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        success: false,
      });
    }
    if (err) {
      return res.status(400).json({
        message: err ? err : "Some error ,Login failed",
      });
    }
    const newUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(
      newUser,
      "kBoaeMlNFqifswTPxVar6DEXzDTFsEd51SW6UzXP8AeE3D0aIufTBbxnLVIdNEy",
      { expiresIn: "7 days" }
    );
    return res.json({
      message: "Hurray! You are now logged in.",
      success: true,
      newUser,
      token,
    });
  });
};

export default userLogin;
