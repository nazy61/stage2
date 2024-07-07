const { UserOrganisations, User, Organisation } = require("../../models");

module.exports.hasAccess = async (req, res, next) => {
  const { orgId } = req.params;

  try {
    const organisation = await Organisation.findOne({
      where: { orgId },
    });
    if (!organisation) {
      throw new Error("Organisation not found");
    }

    const user = await User.findOne({
      where: { userId: req.userId },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const userOrg = await UserOrganisations.findOne({
      where: { orgId: organisation.id, userId: user.id },
    });

    if (!userOrg) {
      throw new Error("User does not have access to this organisation");
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "User does not have access to this organisation",
      statusCode: 400,
    });
  }
};
