const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  let user = sessionIdToUserMap.get(id);
  console.log("important",user);
  return user;
}

module.exports = {
  setUser,
  getUser,
};
