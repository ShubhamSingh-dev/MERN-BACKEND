import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session"; //also a middleware

const app = express();

app.use(session(  // Middleware to handle sessions
  {
    secret:"mysecretkey",
    saveUninitialized: false,
    resave: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }
))

app.use(cookieParser("Shubham"));

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  req.session.user = { // Storing user data in session
    name: "Shubham",
    age: 20,
    email: "i4a5o@example.com",
  };
  res.send(`${req.session.user.name} is logged in`);
});

app.get("/logout", (req, res) => {
 req.session.destroy(); // Destroys the session
 res.send("User logged out successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
