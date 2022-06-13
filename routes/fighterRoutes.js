const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");
const { FighterRepository } = require("../repositories/fighterRepository");
const { RESPONSE_STATUS_CODES } = require("../constants/responseStatus");

const router = Router();

router.get(
  "/",
  function (req, res, next) {
    try {
      const data = FighterService.getFighters();

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

router.get(
  "/:id",
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = FighterService.getFighter(id);
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

router.post(
  "/",
  function (req, res, next) {
    try {
      const data = FighterService.createFighter(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.badRequest;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.put(
  "/:id",
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = FighterService.updateFighter(id, req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
      res.errCode = RESPONSE_STATUS_CODES.badRequest;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.delete(
  "/:id",
  function (req, res, next) {
    try {
      const { id } = req.params;
      const data = FighterService.deleteFighter(id);
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
