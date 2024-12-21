const mongoose = require("mongoose");

async function connectMongoDB(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Error"));
}

module.exports = {
  connectMongoDB,
};
