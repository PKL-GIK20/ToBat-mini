const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const userController = require("../controllers/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.use("/user", verifyToken, require("./user"));
router.use("/product", verifyToken, require("./product"));
router.use("/stock", verifyToken, require("./stock"));
router.use("/category", verifyToken, require("./category"));
router.use("/stockProduct", verifyToken, require("./stockProduct"));
router.use("/penerimaan", verifyToken, require("./penerimaan"));

module.exports = router;
