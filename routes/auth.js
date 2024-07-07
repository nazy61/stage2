const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const log = require("../middlewares/logger");
const { bodyValidator } = require("../middlewares/error_handler");
const {
  userRegistrationSchema,
  userLoginSchema,
} = require("../joi-shemas/user");

const router = Router();

router.post("/register", log, bodyValidator(userRegistrationSchema), register);
router.post("/login", log, bodyValidator(userLoginSchema), login);

module.exports = router;
