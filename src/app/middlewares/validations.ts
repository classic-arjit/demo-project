const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().required().pattern(new RegExp("^[a-zA-Z\\s]*$")).min(3),
  role: Joi.string().required(),
  permission:Joi.array(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase()
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
    .required()
    .min(6),
  cPassword: Joi.ref('password'),
});

export default authSchema;
