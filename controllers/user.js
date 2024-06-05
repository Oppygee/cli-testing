const models = require("../models");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken")
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email)
      throw new Error("Invliad credentials");

    const checkIFUserExists = await models.Users.findOne({
      where: { email: email },
    });

    if (checkIFUserExists) throw new Error("user exists");

    await models.Users.create({
      firstName,
      lastName,
      email,
      user_id: uuid(),
    });

    return res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message || "server error",
    });
  }
};

const Login = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await models.Users.findOne({
      where: { email: email },
    });

    if (!userData) throw new Error("Invalid email or phone");

    const payload = {
      id: uuid(),
      email: email,
    };
    const token = jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: true,
      message: "Login success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message || "server error",
    });
  }
};

module.exports = {
  createUser,
  Login,
};
