const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt import added
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isadmin: {
    type: Boolean,
    default: false
  }
});


userschema.methods.generatetoken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isadmin: this.isadmin
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" } // 
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};


userschema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next(); 
  }
  try {
    const hash_password = await bcrypt.hash(user.password, 10);
    user.password = hash_password;
    next(); 
  } catch (error) {
    console.log(error);
    next(error); 
  }
});

const User = mongoose.model("User", userschema);
module.exports = User;
