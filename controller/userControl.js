const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  let { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogin(req, res) {
  let { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  ///////////////// this is 3 lines for statefull auth
  // let sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);

  ///////////////// this is lines for stateless auth
  let token = setUser(user);
  res.cookie("token", token);

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
