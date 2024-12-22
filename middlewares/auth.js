const { getUser } = require("../service/auth");

// async function restricToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
// console.log("userid is ",userUid);
//   if (!userUid) {
//     return res.redirect("/login");
//   }

//   let user = await getUser(userUid);
// console.log("user is",user);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// module.exports = {
//   restricToLoggedinUserOnly,
// };

//new code for authorization....

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
   return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
