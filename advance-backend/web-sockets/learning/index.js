// Import the built-in 'http' module from Node.js.
// We use this to create a basic HTTP server that WebSocket will use as a base.
import http from "http";

// Import the 'ws' module which provides WebSocket functionalities in Node.js.
// We're importing both the default WebSocket object and the WebSocketServer class.
import WebSocket, { WebSocketServer } from "ws";

// Step 1: Create a basic HTTP server
// This will handle incoming HTTP requests (like visiting the server in a browser).
const server = http.createServer((req, res) => {
  // Log the request details along with current date and time
  console.log(new Date() + " Received request for " + req.url);

  // Respond to the request with a simple message
  res.end("Hi there"); // You can change this message as needed
});

// Step 2: Create a WebSocket server and attach it to the HTTP server
// WebSocket allows two-way real-time communication between client and server
const wss = new WebSocketServer({ server });
// This WebSocket server now listens on the same port as the HTTP server

// Step 3: Listen for new client connections
wss.on("connection", function connection(ws) {
  // 'ws' represents the connected client

  // Handle and log any error that occurs during the WebSocket connection
  ws.on("error", console.error);

  // Listen for messages from the connected client
  ws.on("message", function message(data, isBinary) {
    // 'data' is the message received from the client
    // 'isBinary' is true if the message is binary data (like images or files)

    // Broadcast the received message to all connected clients
    // Useful in group chats, games, live collaboration apps, etc.
    wss.clients.forEach(function each(client) {
      // Check if the client connection is still open
      if (client.readyState === WebSocket.OPEN) {
        // Send the received message to the client
        client.send(data, { binary: isBinary });
      }
    });
  });

  // Send a welcome message to the newly connected client
  // This lets the user know they’ve connected successfully
  ws.send("Hello! connection message from ws server");
});

// Step 4: Start the HTTP (and WebSocket) server on port 8080
server.listen(8080, () => {
  // Log that the server is up and running
  console.log(new Date() + " Server is listening on port 8080");
});
