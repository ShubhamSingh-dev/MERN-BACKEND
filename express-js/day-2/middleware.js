import express from "express";

const app = express();
const PORT = 3000;

//This is how we create a middleware in express
const sayHIMiddleware = (req, res, next) => {
  console.log("Hi i am middleware💕");
  next();
};
//if we dont pass next() and hit the route in thunderclient it will not work and it will be stuck in the middleware

// *1.Global Middleware ✅
//app.use is used to register middleware in express
// app.use(sayHIMiddleware); // Global Middleware
// The above middleware will be applied to all routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About Page!");
});

// *2.specific route middleware

app.get("/contact", sayHIMiddleware, (req, res) => {
  res.send("Contact Page!");
});
// By adding sayHIMiddleware to the /contact route, it will only be applied to that route. You can add multiple middleware functions to a single route.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 1.Global Middleware ✅
// 2.specific route middleware ✅
// 3 inbuilt middleware : eg. express.json() and express.urlencoded()
