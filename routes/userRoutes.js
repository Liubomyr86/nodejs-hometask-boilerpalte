const { Router } = require("express");
const UserService = require("../services/userService");
const { createUserValid, updateUserValid } = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// TODO: Implement route controllers for user

router.get("/", function (req, res, next) {
  const result = UserService.getUsers();

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
  const result = UserService.getUser(id);

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
  const result = UserService.createUser(req.body);

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
