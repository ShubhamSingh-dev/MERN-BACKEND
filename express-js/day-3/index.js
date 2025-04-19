import express from "express";
import cookieParser from "cookie-parser"; //importing cookie parser to parse the cookies in the request

const app = express();
app.use(cookieParser("secret")); //using cookie parser middleware to parse the cookies in the request


app.get("/", (req, res) => {
  // !How to set it up
  res.cookie("name", "express", {
    maxAge: 1000 * 60 * 60 * 24, // takes milliseconds as time, 1 day
    signed: true, 
  }); //this is how you set a cookie in express accepts key value pair where name is the key and express is the value
  res.send("Hello World!");
});

//?sending this product only when cookie is express 
app.get("/product", (req, res) => {
  console.log("cookie", req.cookies);
  console.log("signed cookie", req.signedCookies); 

  if(req.cookies.name && req.cookies.name === "express") {
    res.status(200).send({
      id: 1,
      name: "product 1",
      price: "100 RS",
    });
  } 

  res.status(403).send({
    message: "You are not authorized to access this product",
  });


});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});


 //console.log(req.cookies); Undefined 
  //console.log(req.headers.cookie); //
  //console.log("cookie", req.cookies); //undefined

  //read about && ?? 
