// This is how the model of user will look like created using mongoose
import mongoose, { Schema } from 'mongoose';
// jwt is json web token , it is used to encrypt the web tokens so that we can encrypt
// the data we are sending so it can only be understood by server
// we installed it using npm i jsonwebtoken
import jwt from 'jsonwebtoken';
// bcrypt is a dependency used to encrypt passwords or hash the
// passwords we installed it using npm i bcrypt
import bcrypt from 'bcrypt';

// one more thing we cannot directly use these two libraries so we have a
// middleware by mongoose called pre , which allows us to run some code on data
// before it gets saved so we will use that pre to use these libraries
// both the above library is widely used.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// here we are using the middleware pre which require two field one is "event" that is when
// do you want to apply this code , second thing is the code that you want to run or a callback
// but we cannot use => () this directly because it doesn't have the access of this and that is why
// we have created a function and next flag is always passed in case of middlewares because there
// could be multiple middlewares and this function is async because it takes it's sweet time

userSchema.pre('save', async function (next) {
  // this condition checks that until we don't modify the password don't encrypt it everytime
  // encrypt only when it is modified and this isModified is given to us by mongoose not bcrypt
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password, 10);
  // once work is done pass the next flag so if there is any other middleware then they will do
  // their work.
  next();
});

// this is to check if the encrypted pass is same as password sent by the user
userSchema.methods.isPasswordCorrect = async function (password) {
  // bcrypt allows us to compare them and because it takes times so await.
  return await bcrypt.compare(password, this.password);
};
// this is a method we created to generateaccesstokens it returns a token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // this value that is that id will be provided by mongoDB it is not in our model
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    // this values are in the enviroment variables accordingly it generates
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// this is exactly similar to the above one just the diff is here we don't need to store all the values just the
// userid is enough
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userSchema);
