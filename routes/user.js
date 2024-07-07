const { Router } = require("express");
const { get_user } = require("../controllers/user");
const { verifyToken } = require("../middlewares/auth");
const log = require("../middlewares/logger");

const router = Router();

router.get("/user/:id", log, verifyToken, get_user);

module.exports = router;
