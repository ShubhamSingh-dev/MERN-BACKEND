import moongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving to database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default moongoose.model("User", userSchema);

/*
 This middleware function runs automatically **before saving** a user to the database.
 We're using it to hash the password so that it's never stored in plain text.

userSchema.pre("save", async function (next) {
   Check if the password was modified. If not, skip hashing and move to the next step.
  if (!this.isModified("password")) return next();

   If the password was modified (e.g., during user registration or password update),
   hash it using bcrypt with a salt round of 10.
  this.password = await bcrypt.hash(this.password, 10);

   Call the next() function to continue the save process.
  next();
});


 This function is added to the user schema's methods, which means
 we can call it on a user document (e.g., user.comparePassword()).

 It compares a plain password (entered by the user) with the hashed password stored in the database.
userSchema.methods.comparePassword = async function (password) {
   bcrypt.compare() returns true if the passwords match, otherwise false.
  return await bcrypt.compare(password, this.password);
};


*/
