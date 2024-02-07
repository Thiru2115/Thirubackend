const userModels = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //Existing User Check
    const existingUser = await userModels.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exist" });
    }
    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //User Creation
    const result = await userModels.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    //Token Generate
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).send({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModels.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).send({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
