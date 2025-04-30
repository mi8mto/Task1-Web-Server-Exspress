const chalk = require("chalk");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });
  console.log(chalk.bgYellow("User created!"));
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User is not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }
  console.log(chalk.bgCyan("User login!"));

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = {
  addUser,
  loginUser,
};
