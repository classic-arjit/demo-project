const mongooses = require("mongoose");

const SignUpSchema = new mongooses.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    // required: true,
  },
  permission:{
    type:Array
  },
  role: {
    type: String,
    default: "user",
    enum: [
      "super-admin",
      "manager",
      "hr",
      "user",
      "employee",
      "seo",
      "content-writter",
    ],
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongooses.model("User", SignUpSchema);
module.exports = User;

