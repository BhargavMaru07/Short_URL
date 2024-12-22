//////////////////////    this is for StateFull AUTH........................
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   let user = sessionIdToUserMap.get(id);
//   return user;
// }

//////////////////////    this is for StateLess AUTH........................

const jwt = require("jsonwebtoken");
const secret = "bhargav@123";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token){
  if(!token) return null

  try {
    return jwt.verify(token,secret)
  } catch (error) {
    console.log(error);
    return null
  }
}
module.exports = {
  setUser,
  getUser,
};
