const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
      type: String,
      required: true,
      default:"NORMAL"
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let User = mongoose.model("user",userSchema)

module.exports = User
