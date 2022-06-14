const { Router } = require("express");
const UserService = require("../services/userService");
const { createUserValid, updateUserValid } = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");

const router = Router();

router.get(
  "/",
  function (req, res, next) {
    try {
      const data = UserService.getUsers();
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.notFound;
    }
    next();
  },
  responseMiddleware,
);

router.get(
  "/:id",
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = UserService.getUser(id);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.notFound;
    }
    next();
  },
  responseMiddleware,
);

router.post(
  "/",
  createUserValid,
  function (req, res, next) {
    try {
      if (!res.errCode) {
        const data = UserService.createUser(req.body);
        res.data = data;
      }
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.badRequest;
    }
    next();
  },
  responseMiddleware,
);

router.put(
  "/:id",
  updateUserValid,
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = UserService.updateUser(id, req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.badRequest;
    }
    next();
  },
  responseMiddleware,
);

router.delete(
  "/:id",
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = UserService.deleteUser(id);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.notFound;
    }
    next();
  },
  responseMiddleware,
);

module.exports = router;
