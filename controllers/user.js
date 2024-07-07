const { User, Organisation } = require("../models");
const logger = require("../utils/logger");

// Get User Details
module.exports.get_user = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { userId: id } });
    if (!user) {
      throw new Error("User does not exist");
    }

    return res.json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
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
