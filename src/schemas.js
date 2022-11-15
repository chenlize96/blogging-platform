const doc = require("../password");
const mongoose = require("mongoose");
const connectionString = doc.PASSWORD;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  salt: {
    type: String,
    required: [true, "Salt is required"],
  },
  hash: {
    type: String,
    required: [true, "Hash is required"],
  },
});

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  zipcode: {
    type: Number,
    required: [true, "Zipcode is required"],
  },
  dob: {
    type: Number,
    required: [true, "Dob is required"],
  },
  headline: {
    type: String,
    required: [true, "Headline is required"],
  },
  followedUsers: {
    type: Array,
  },
  avatar: {
    type: String,
  },
});

module.exports.User = mongoose.model("user", userSchema);
module.exports.Profile = mongoose.model("profile", profileSchema);
