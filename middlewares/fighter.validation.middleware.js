const isEmpty = require("lodash.isempty");
const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");
const { fighter } = require("../models/fighter");

const schema = {
  id: (value) => false,
  name: (value) => /^[a-zA-Z]+$/.test(value),
  power: (value) => +value >= 1 && +value <= 10,
  defense: (value) => +value >= 1 && +value <= 10,
};

const errorMessage = (value) => {
  let message = null;

  switch (value) {
    case "id":
      message = `Don't use the "id" property in the query `;
      break;
    case "name":
      message = "Name must by only text";
      break;
    case "power":
      message = "Power must be number in the range from 1 to 10";
      break;
    case "defense":
      message = "Defense must be number in the range from 1 to 10";
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

const createFighterValid = (req, res, next) => {
  const { id, ...restValues } = fighter;
  const data = Object.assign({}, restValues, req.body);
  const errors = validate(data, schema);

  if (errors.length > 0) {
    res.err = errors;
    res.errCode = RESPONSE_STATUS_CODES.badRequest;
  }
  next();
};

const updateFighterValid = (req, res, next) => {
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

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
