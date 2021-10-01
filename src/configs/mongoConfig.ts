const mongoose = require("mongoose");

const URI =
  "mongodb+srv://adminci:adminci@cluster0.yuylj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectDB = async () => {
  //   await mongoose
  //     .connect(URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then(() => console.log("Connection Successfully with Mongoose"))
  //     .catch((e: any) => console.log(e));
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successfully with Mongoose");
  } catch (e: any) {
    console.log(e);
  }
};

module.exports = connectDB;
