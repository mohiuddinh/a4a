const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    description: { type: String, default: 'n/a' }, 
    major: { type: String, default: 'n/a' }, 
    occupation: { type: String, default: 'n/a' }, 
    iconColor: { type: String, default: 'lightblue' }, 
    tag: { type: Array, default: [] }
  },
  { collection: "users" }
);

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
