Middleware : middleware basically beechwale ki tarah kaam krta hai , jaise ki ek request ko bheji uske sath kya karna hai like aage bhejna hai , ya nahin , ya kuch krna hai uske sath aisa sab 

Middleware takes three parameter req, res, next 
//This is how we create a middleware in express
const sayHIMiddleware = (req, res, next) => {
  console.log("Hi i am middleware💕");
  next();
};
//if we dont pass next() and hit the route in thunderclient it will not work and it will be stuck in the middleware

//app.use is used to register middleware in express
app.use(sayHIMiddleware); // Global Middleware
// The above middleware will be applied to all routes

// 1.Global Middleware ✅
// 2.specific route middleware ✅
// 3 inbuilt middleware : eg. express.json() and express.urlencoded()



Middleware ka benefit kya hai ? 
ans. so basically work beech main toh jaise tum login krne ja rahe ho so it is used wheter tum authenticated ho , i mean bina faltu ke lohin thodi karega , agr middleware use nahin kiya toh login krte wakt authenticated bina route ko access kr paega jo ham nahin chahte, waise hi bhot examples hai 


Learning about express routes 
lets say we lots of routes for a particaualr thing to group them and make it mainatanable for developrer we use express router
---> how we use ? 
we make a folder named *router*
and make a js file , note: a good naming convention is to write like this 
if the routes are for user then 
user.routes.js
if fpr crates then 
crates.routes,js


now in user.routes.js
import { Router } from "express";
name the router 
const userRouter = Router();
and then add all your app routes for this specific file and replace app with userRouter
app.get() --> userRouter.get()

To use first export default userRouter;

and then import in index.js 
import userRouter from "./routers/user.routes.js";
and how we use it simple like middleware , app.use(userRouter)  Thats it npw you can access the routes 
eg: http://localhost:3000/getAllUser

Industry practice , to use userRouter is to add prefix
app.use("/api/v1/users", userRouter); This is hpw we add prefix so now the routes will be 
eg: http://localhost:3000/api/v1/users/create-user
http://localhost:3000/api/v1/users/getAllUser


NOTE : MIddleware should have their own folder name middleware and then access in index.js 

# Token Authentication Flow

## How Tokens Work
1. **Get Token**:
   ```http
   POST /public/generate-token
   ```
   Returns: 
   ```json
   { "token": "abc123..." }  // 32-character hex
   ```

2. **Use Token**:
   - Add to request headers:
     ```http
     GET /private/dashboard
     Authorization: abc123...
     ```
   - Or as query param (testing only):
     ```http
     GET /private/dashboard?token=abc123...
     ```

## Thunder Client Setup
1. Create request to private route
2. In "Headers" tab add:
   ```
   Key: Authorization  
   Value: [paste_token_here]
   ```

## Middleware Code
```javascript
// auth.middleware.js
const token = req.headers['authorization'] || req.query.token;

if (!token || !validateToken(token)) {
  return res.status(401).send("Invalid token");
}
next();
```

## Token Validation
```javascript
// token-utils.js
export const validateToken = (token) => {
  return token && token.length === 32;
}
```

## Key Points
- Always prefer `Authorization` header over query params
- Tokens expire when server restarts (stateless)
- Check server logs if requests fail
```