const { Router } = require("express");
const {
  get_user_organisations,
  get_organisation,
  add_organisation,
  add_user,
} = require("../controllers/organisation");
const { verifyToken } = require("../middlewares/auth");
const { hasAccess } = require("../middlewares/org/access");
const log = require("../middlewares/logger");
const { bodyValidator } = require("../middlewares/error_handler");
const { orgSchema, addUserSchema } = require("../joi-shemas/organisation");

const router = Router();

router.get("/organisations", log, verifyToken, get_user_organisations);
router.get(
  "/organisations/:orgId",
  log,
  verifyToken,
  hasAccess,
  get_organisation
);
router.post(
  "/organisations",
  log,
  verifyToken,
  bodyValidator(orgSchema),
  add_organisation
);
router.post(
  "/organisations/:orgId/users",
  log,
  verifyToken,
  bodyValidator(addUserSchema),
  hasAccess,
  add_user
);

module.exports = router;
