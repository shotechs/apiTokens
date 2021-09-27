//VALIDATION
const Joi = require("joi");

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

// password: Joi.string()
// .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//New User Cash Validation
const addCashValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "gov"] },
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
    cash: Joi.number().integer().required().label(`Cash`),
  });
  return schema.validate(data, options);
};

//New User Validation
const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case("lower")
      .required()
      .label(`User Name`),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
    firstName: Joi.string()
      .pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .min(3)
      .max(30)
      .case("lower")
      .label(`First Name`),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .min(3)
      .max(30)
      .case("lower")
      .label(`Last Name`),
    moneyType: Joi.string().min(1).max(1).case("lower").label(`Money Type`),
    address_line_1: Joi.string()
      .pattern(/^\d+\s[A-z]+\s[A-z]+/)
      .min(3)
      .max(50)
      .case("lower")
      .label(`Address Line 1`),
    address_line_2: Joi.string()
      .pattern(/[A-z0-9]+\s[A-z0-9\s]*/)
      .min(3)
      .max(50)
      .case("lower")
      .label(`Address Line 2`),
    city: Joi.string()
      .pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .min(3)
      .max(30)
      .case("lower")
      .label(`City`),
    state: Joi.string().alphanum().min(2).max(3).case("lower").label(`State`),
    zip_code: Joi.string()
      .pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)
      .min(3)
      .max(15)
      .case("lower")
      .label(`Zip code`),
    bio: Joi.string().case("lower").label(`Bio`),
    //user_image: Joi.string().alphanum().case("lower").label(`Password`),
  });
  return schema.validate(data, options);
};

//New Game Validation
const gameValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    bet: Joi.number().required(),
  });
  return schema.validate(data, options);
};

//Update Cash Validation
const cashValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    bet: Joi.number().required(),
  });
  return schema.validate(data, options);
};

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case("lower")
      .required()
      .label(`User Name`),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
    password: Joi.string().min(6).required().label(`Password`)
  });
  return schema.validate(data, options);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
    password: Joi.string().min(6).required().label(`Password`),
  });
  return schema.validate(data, options);
};

//get user by email Validation
const getUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
  });
  return schema.validate(data, options);
};

const userUpdatePasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "gov"] },
      })
      .min(5)
      .case("lower")
      .required()
      .label(`Email`),
  });
  return schema.validate(data, options);
};




module.exports.getUserValidation = getUserValidation;
module.exports.userValidation = userValidation;
module.exports.gameValidation = gameValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addCashValidation = addCashValidation;
