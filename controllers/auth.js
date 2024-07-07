require("dotenv").config();
const logger = require("../utils/logger");
const { User, Organisation, UserOrganisations } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/auth");

// Registers a users and creates a default organisation
module.exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(422).json({
        status: "Bad Request",
        message: "User already exists",
        statusCode: 422,
      });
    }

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: password,
    });

    // Create User Organisation
    const organisation = await Organisation.create({
      name: `${firstName}'s Organisation`,
    });

    // Add user to organisation
    await UserOrganisations.create({
      orgId: organisation.id,
      userId: user.id,
    });

    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: generateToken(user.userId),
        user,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: "Bad Request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};

// Logs in a user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User does not exist");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: generateToken(user.userId),
        user,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(401).json({
      status: "Bad Request",
      message: "Authentication failed",
      statusCode: 401,
    });
  }
};
