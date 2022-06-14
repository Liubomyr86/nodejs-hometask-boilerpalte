const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");
const { user } = require("../models/user");

const schema = {
  id: (value) => false,
  firstName: (value) => /^[a-zA-Z]+$/.test(value),
  lastName: (value) => /^[a-zA-Z]+$/.test(value),
  email: (value) => /^([A-Za-z0-9_\-\.])+\@(gmail)+\.(com)$/.test(value),
  phoneNumber: (value) => /^\+380[0-9]{9}$/.test(value),
  password: (value) => value.length >= 3 && value.length <= 16,
};

const errorMessage = (value) => {
  let message = null;

  switch (value) {
    case "id":
      message = `Don't use the "id" property in the query `;
      break;
    case "firstName":
      message = "Name must by only text";
      break;
    case "lastName":
      message = "Surname must by only text";
      break;
    case "email":
      message = "Email must be @gmail.com";
      break;
    case "phoneNumber":
      message = `Phone number must be in the format "+380xxxxxxxxx"`;
      break;
    case "phoneNumber":
      message = "Password must be min 3 characters and max 16 characters";
      break;
    default:
      message = `${value} is a wrong property`;
      break;
  }
  return message;
};

const validate = (object, schema) =>
  Object.keys(object)
    .filter((key) => (schema[key] ? !schema[key](object[key]) : key))
    .map((key) => errorMessage(key));

const createUserValid = (req, res, next) => {
  const { id, ...restValues } = user;
  const data = Object.assign({}, restValues, req.body);
  const errors = validate(data, schema);

  if (errors.length > 0) {
    res.err = errors;
    res.errCode = RESPONSE_STATUS_CODES.badRequest;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const data = Object.assign({}, req.body);
  if (isEmpty(data)) {
    res.err = "Body of the query is empty";
    res.errCode = RESPONSE_STATUS_CODES.badRequest;
  } else {
    const errors = validate(data, schema);
    if (errors.length > 0) {
      res.err = errors;
      res.errCode = RESPONSE_STATUS_CODES.badRequest;
    }
  }
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
