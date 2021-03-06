const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "images.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mylist:{
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
