# What is Express.js?

A fast, minimal web framework for Node.js used to build APIs and web applications.  
Supports middleware, routing, and handling HTTP methods efficiently.

---

## Basic Setup:

### Install Node.js and Initialize the Project:
```bash
npm init -y
npm install express
```

### Use `.gitignore`:
Always use a `.gitignore` file to avoid pushing sensitive or unnecessary files (e.g., `node_modules`, `.env`) to version control.

---

## Installing Nodemon:
Nodemon is a development dependency used to automatically restart the server when file changes are detected.  
This eliminates the need to manually run `node index.js` repeatedly.

### Install Nodemon:
```bash
npm i -D nodemon
```
`-D` means it is installed as a development dependency, as it is not required during deployment.

---

## Switching to ES Modules:
By default, Node.js uses CommonJS syntax. To use ES Modules (`import/export`), update the `package.json` file:
```json
"type": "module"
```

---

## Setting Up Nodemon:
Add the following scripts to the `package.json` file:
```json
"scripts": {
  "start:dev": "nodemon index.js",
  "start": "node index.js"
}
```

### Run the Development Server:
```bash
npm run start:dev
```

---

## GET Request:
### Purpose:
Fetch data from the server.

### Example:
```javascript
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
```
- This route responds with "Hello World!" when a GET request is made to the root URL (`/`).

```javascript
app.get("/api/v1/users", (req, res) => {
  res.status(200).send(userData);
});
```
- This route responds with user data when a GET request is made to `/api/v1/users`.
- **Industry Standard**: Using versioned API endpoints (e.g., `/api/v1`) is a best practice. It allows for future updates without breaking existing clients.

### Query Parameters:
In the code below, query parameters are used to filter user data based on the `name` provided in the request.

```javascript
app.get("/api/v1/users", (req, res) => {
  // console.log(req.query); // Logs the query parameters sent in the request
  const { name } = req.query; // Destructure the `name` parameter from the query

  if (name) {
    const filteredUsers = userData.filter((user) => user.name === name);
    return res.status(200).json(filteredUsers); // Respond with filtered user data in JSON format
  }

  // If no query parameter is provided, respond with all user data
  res.status(200).send(userData);
});
```

- **Query Parameters**: Query parameters are key-value pairs sent in the URL after a `?`. For example:  
  `http://localhost:8080/api/v1/users?name=Bob`
- **Accessing Query Parameters**: Use `req.query` to access query parameters. It is an object containing all key-value pairs.
- **Destructuring**: The `name` parameter is extracted from `req.query` using destructuring:  
  `const { name } = req.query;`
- **Example**: If the URL is `http://localhost:8080/api/v1/users?name=Bob`, the server will filter the `userData` array for users with the name "Bob" and return the result.

---

### Router Parameters:
Router parameters are used to extract specific values from the URL path, such as a user ID.

```javascript
app.get("/api/v1/users/:id", (req, res) => {
  // console.log(req.params); // Logs the route parameters sent in the request
  const { id } = req.params; // Destructure the `id` parameter from the route
  const parseId = parseInt(id); // Convert the `id` from a string to a number
  const user = userData.find((user) => user.id === parseId); // Find the user with the matching ID

  // Respond with the user data if found, or send a 404 status if not found
  res.status(200).send(user);
});
```

- **Router Parameters**: Router parameters are placeholders in the URL path, prefixed with a colon (`:`). For example:  
  `/api/v1/users/:id`
- **Accessing Router Parameters**: Use `req.params` to access route parameters. It is an object containing all key-value pairs.
- **Destructuring**: The `id` parameter is extracted from `req.params` using destructuring:  
  `const { id } = req.params;`
- **Converting to Number**: Since `req.params` values are strings, `parseInt` is used to convert the `id` to a number.
- **Example**: If the URL is `http://localhost:8080/api/v1/users/1`, the server will find the user with `id = 1` in the `userData` array and return the result.

---

### Summary:
- **Query Parameters**: Used for filtering or searching data. Accessed via `req.query`.
- **Router Parameters**: Used for identifying specific resources (e.g., user by ID). Accessed via `req.params`.
- **Example URLs**:
  - Query Parameter: `http://localhost:8080/api/v1/users?name=Bob`
  - Router Parameter: `http://localhost:8080/api/v1/users/1`


  ### POST Request:
POST requests are used to send data to the server, typically to create new resources.

```javascript
// *2. POST request (It is for sending data to the server)
app.post("/api/v1/users", (req, res) => {
  console.log(req.body); // Logs the body of the request sent by the client
  res.status(201).send("Data has been added successfully"); // Responds with a 201 status code (Created)
});
```

- **Purpose**:  
  POST requests are used to send data from the client to the server, usually to create or add new resources (e.g., adding a new user to a database).

- **Format**:  
  The data sent in a POST request is typically included in the request body. The body can be in JSON, form-data, or other formats.

- **Parsing the Request Body**:  
  Initially, if you send a POST request with a JSON body, the `req.body` will be `undefined` unless the server is configured to parse the incoming JSON data.  
  To parse the JSON data, use the following middleware:
  ```javascript
  app.use(express.json()); // This middleware parses JSON data from the request body
  ```

- **Example**:  
  If you send a POST request to `http://localhost:8080/api/v1/users` with the following JSON body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
  The server will log the body (`req.body`) as:
  ```javascript
  { name: "John Doe", email: "john@example.com" }
  ```

- **Status Code**:  
  The server responds with a `201` status code, which indicates that the resource has been successfully created.

- **Best Practices**:  
  - **Never Send IDs**: When working with databases, IDs are typically generated automatically by the database or the server. Clients should not send IDs in the request body.
  - **Validation**: Always validate the incoming data to ensure it meets the required format and constraints before processing it.

```javascript
app.post("/api/v1/users", (req, res) => {
  const { name, displayname } = req.body; // Extract data from the request body
  const newUser = {
    id: userData.length + 1, // Auto-generate ID
    name,
    displayname,
  };
  userData.push(newUser); // Add new user to the array
  res.status(201).send({
    message: "User created successfully",
    data: newUser,
  }); // Respond with success
});
```

- **Purpose**: Used to create new resources (e.g., adding a user).
- **Request Body**: Data is sent in JSON format and parsed using `app.use(express.json())`.
- **ID Generation**: IDs are auto-generated based on the array length.
- **Response**: Returns a `201` status code with a success message and the created user data.
- **Best Practices**: Never send IDs from the client; validate incoming data before processing.