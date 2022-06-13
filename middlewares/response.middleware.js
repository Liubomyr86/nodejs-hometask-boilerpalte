const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");

const responseMiddleware = (req, res, next) => {
  switch (res.errCode) {
    case RESPONSE_STATUS_CODES.badRequest:
      res.status(res.errCode).json({ error: true, message: `${res.err}` });
      break;

    case RESPONSE_STATUS_CODES.notFound:
      res.status(res.errCode).json({ error: true, message: `${res.err}` });
      break;

    default:
      res.status(RESPONSE_STATUS_CODES.success).json(res.data);
      break;
  }
  next();
};

exports.responseMiddleware = responseMiddleware;
