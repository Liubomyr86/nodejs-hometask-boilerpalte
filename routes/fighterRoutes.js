const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");
const { FighterRepository } = require("../repositories/fighterRepository");

const router = Router();

// TODO: Implement route controllers for fighter

router.get("/", function (req, res, next) {
  const result = FighterService.getFighters();

  if (result) {
    res.send(result);
  } else {
    const error = {
      error: true,
      message: "Users not found",
    };

    res.status(404).json(error);
  }
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const result = FighterService.getFighter(id);

  if (result) {
    res.send(result);
  } else {
    const error = {
      error: true,
      message: "User not found2",
    };

    res.status(404).json(error);
  }
});

router.post("/", function (req, res, next) {
  const result = FighterService.createFighter(req.body);

  if (result) {
    res.send(result);
  } else {
    const error = {
      error: true,
      message: "User not create",
    };

    res.status(404).json(error);
  }
});

router.put("/:id", function (req, res, next) {
  const { id } = req.params;
  const result = FighterService.updateFighter(id, req.body);

  if (result) {
    res.send(result);
  } else {
    const error = {
      error: true,
      message: "User not create",
    };

    res.status(404).json(error);
  }
});

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const result = FighterService.deleteFighter(id);

  if (result) {
    res.send(result);
  } else {
    const error = {
      error: true,
      message: "User not create",
    };

    res.status(404).json(error);
  }
});

module.exports = router;
