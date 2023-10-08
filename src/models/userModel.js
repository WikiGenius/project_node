const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
// https://github.com/validatorjs/validator.js

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A user name must have less or equal than 40 characters'],
    minlength: [10, 'A user name must have more or equal than 10 characters']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'A password must have more or equal than 8 characters'],
    select: false // This will prevent the password from being sent along with the rest of the user data
  },
  passwordConfirmed: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  photo: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'default.jpg', // Set a default value if no photo is provided
    validate: {
      validator: function(v) {
        return /.*\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image file path!`
    }
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'guide', 'lead-guide', 'admin'],
      message: 'Role is either: user, guide, lead-guide, admin'
    },
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true,
    select: false // This will prevent this field from being outputted in API responses
  },
  passwordChangedAt: Date
});
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Document middleware to hash the password before saving the document
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirmed field
  this.passwordConfirmed = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTiat) {
  console.log(this)
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTiat)
    return changedTimestamp > JWTiat;
  }
  return false;
};

// Create the user model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
