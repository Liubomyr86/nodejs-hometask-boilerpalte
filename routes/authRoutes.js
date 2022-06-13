const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const data = AuthService.login(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.notFound;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

module.exports = router;
