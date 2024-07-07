const { User, Organisation, UserOrganisations } = require("../models");
const logger = require("../utils/logger");

// Get User Organisations
module.exports.get_user_organisations = async (req, res) => {
  try {
    // Get User Details
    const user = await User.findOne({ where: { userId: req.userId } });

    const organisations = await UserOrganisations.findAll({
      where: { userId: user.id },
    });

    let returnedOrganisations = [];

    for (let i = 0; i < organisations.length; i++) {
      const organisation = await Organisation.findOne({
        where: { id: organisations[i].orgId },
      });

      returnedOrganisations.push(organisation);
    }

    return res.json({
      status: "success",
      message: "User Organisations retrieved successfully",
      data: {
        organisations: returnedOrganisations,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: "Bad Request",
      message: err,
      statusCode: 400,
    });
  }
};

// Get Single Organisation
module.exports.get_organisation = async (req, res) => {
  const { orgId } = req.params;

  try {
    // Get Organisation
    const organisation = await Organisation.findOne({ where: { orgId } });
    if (!organisation) {
      throw new Error("Organisation does not exist");
    }

    return res.json({
      status: "success",
      message: "Organisation retrieved successfully",
      data: organisation,
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: "Bad Request",
      message: err,
      statusCode: 400,
    });
  }
};

// Create new Organisation
module.exports.add_organisation = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Get User
    const user = await User.findOne({ where: { userId: req.userId } });

    // Get Organisation
    const organisation = await Organisation.create({
      name,
      description,
    });

    // add relationship
    await UserOrganisations.create({
      orgId: organisation.id,
      userId: user.id,
    });

    return res.json({
      status: "success",
      message: "Organisation created successfully",
      data: organisation,
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

// Add a user to organisation
module.exports.add_user = async (req, res) => {
  const { userId } = req.body;
  const { orgId } = req.params;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      throw new Error("User does not exist");
    }

    // Check if organisation exists
    const organisation = await Organisation.findOne({ where: { orgId } });
    if (!organisation) {
      throw new Error("Organisation does not exist");
    }

    // Check if user is already in the organisation
    const userOrg = await UserOrganisations.findOne({
      where: { userId: user.id, orgId: organisation.id },
    });
    if (userOrg) {
      throw new Error("User is already in the organisation");
    }

    // Add user to organisation
    await UserOrganisations.create({
      orgId: organisation.id,
      userId: user.id,
    });

    return res.json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};
