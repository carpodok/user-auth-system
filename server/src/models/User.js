const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const timestampPlugin = require("./plugins/timestamp");

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  created_at: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.plugin(timestampPlugin);

module.exports = mongoose.model("user", UserSchema);
