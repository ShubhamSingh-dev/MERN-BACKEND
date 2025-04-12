import express from "express";
import userData from "./data/data.js";

const app = express();
// Middleware to parse JSON request body
app.use(express.json()); //this is used to parse the json data from the request body

const PORT = 8080;

// *1. GET request(It is used to retrieve/fetch data from the server)

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

//Industry standard
app.get("/api/v1/users", (req, res) => {
  // console.log(req.query); //query parameters
  const { name } = req.query; //destructuring

  if (name) {
    const filteredUsers = userData.filter((user) => user.name === name);
    return res.status(200).json(filteredUsers); //json response
  }

  //query parameters
  res.status(200).send(userData);
});

// router params
app.get("/api/v1/users/:id", (req, res) => {
  // console.log(req.params); //params
  //we destructure id from params to get the user id
  const { id } = req.params; //destructuring
  //  currently it is a string but we need to convert it to number
  const parseId = parseInt(id); //parseInt is used to convert string to number
  const user = userData.find((user) => user.id === parseId); //find is used to find the user with the given id
  //if user is not found then we send a 404 status code and a message
  res.status(200).send(user);
});

// *2. POST request(It is for sending data to server)
app.post("/api/v1/users", (req, res) => {
  const { name, displayname } = req.body; //destructuring needs to be exactly same as the data in the request body that is sent from the client

  const newUser = {
    id: userData.length + 1,
    name,
    displayname,
  };

  userData.push(newUser); //pushing the new user to the userData array
  res.status(201).send({
    message: "User created successfully",
    data: newUser,
  }); //201 is the status code for created
});

// *3. PUT request(It is used to update data on the server) --> USed when we want to update the entire data of the user
app.put("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req; //This syntax is another way of destructuring the request object to get the body and params
  const parseId = parseInt(id); //parseInt is used to convert string to number
  const userIndex = userData.findIndex((user) => user.id === parseId); //findIndex is used to find the index of the user with the given id

  if (userIndex === -1) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  userData[userIndex] = {
    id: parseId,
    ...body,
  };

  res.status(200).send({
    message: "User updated successfully",
    data: userData[userIndex],
  });
});
// *4. PATCH request(It is used to update part of the data on the server) --> USed when we want to update specific part of the data of the user
app.patch("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req; //This syntax is another way of destructuring the request object to get the body and params
  const parseId = parseInt(id); //parseInt is used to convert string to number
  const userIndex = userData.findIndex((user) => user.id === parseId); //findIndex is used to find the index of the user with the given id

  if (userIndex === -1) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };

  res.status(200).send({
    message: "User updated successfully",
    data: userData[userIndex],
  });
});

// *5. DELETE request(It is used to delete data from the server)

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

//assignment: IJmplement the DELETE request to delete a user from the server
// read about filter , find , findIndex and map methods in javascript
// study about middleware in express js
