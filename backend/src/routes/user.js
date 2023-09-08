const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/:username", userController.findUsersByUsername);
router.get("/all/username", userController.getAllUsername);
router.get("/all/users", userController.getAllUsers);
router.get("/", userController.getUserProfile);
router.patch("/update", userController.updateProfile);
router.delete("/delete", userController.deleteProfile);

module.exports = router;
