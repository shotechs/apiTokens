//VALIDATION
const Joi = require("joi");



//New User Validation
const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower')
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu", "gov"] } })
      .min(5).case('lower')
      .required(),
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower'),
    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower'),
    moneyType: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower'),
    address_line_1: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .case('lower'),
    address_line_2: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .case('lower'),
    city: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower'),
    state: Joi.string()
      .alphanum()
      .min(2)
      .max(3)
      .case('lower'),
    zip_code: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .case('lower'),
    bio: Joi.string()
      .alphanum()
      .case('lower'),
    user_image: Joi.string()
      .alphanum()
      .case('lower'),
  }

  );
  return schema.validate(data);
};

//New Game Validation
const gameValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string()
      .required(),
    bet: Joi.number()
      .required(),

  });
  return schema.validate(data);
};

//Update Cash Validation
const cashValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string()
      .required(),
    bet: Joi.number()
      .required(),

  });
  return schema.validate(data);
};



//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .case('lower')
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu", "gov"] } })
      .min(5).case('lower')
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    repeat_password: Joi.ref('password'),

  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu", "gov"] } })
      .min(5).case('lower')
      .required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};


//Login Validation
const getUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu", "gov"] } })
      .min(5).case('lower')
      .required(),
  });
  return schema.validate(data);
};




module.exports.getUserValidation = getUserValidation;
module.exports.userValidation = userValidation;
module.exports.gameValidation = gameValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
