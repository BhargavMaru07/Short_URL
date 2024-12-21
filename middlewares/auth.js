const { getUser } = require("../service/auth");

async function restricToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
console.log("userid is ",userUid);
  if (!userUid) {
    return res.redirect("/login");
  }

  let user = await getUser(userUid);
console.log("user is",user);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restricToLoggedinUserOnly,
};
