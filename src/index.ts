const express = require("express");
const connectD = require("./configs/mongoConfig");
// const session = require("express-session");
const passports = require("passport");
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();

// ##################### CORS #########################
// app.use(cors({ origin: 'http://localhost:3000' }));
//######################################################

const PORT = process.env.PORT || 4000;

//Calling Passport Config
require("./app/middlewares/authentication")(passports);

//Connect to mongoose

connectD();

//BodyParser

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Express-Session
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
//   );

// Passport Middleware

app.use(passports.initialize());
app.use(passports.session());

//Routes
app.use("/", require("./routes/index"));
//   app.use("/users", require("./routes/users"));
//   app.use("/todos", require("./routes/list"));

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
