const { Readable, Writable } = require("stream");
// Import the `Readable` and `Writable` classes from the Node.js `stream` module.
// These classes are used to create readable and writable streams for handling data flow.

// Create a readable stream instance
const readableStream = Readable({
  highWaterMark: 4, // Set the buffer size to 4 bytes (controls how much data is read at a time).
  read() {}, // Define the `read` method (required for a readable stream, but left empty here).
});

// Create a writable stream instance
const writableStream = new Writable({
  write(streamData) {
    // Define the `write` method, which is called for each chunk of data written to the stream.
    console.log("Writing data", streamData.toString()); 
    // Log the data being written to the writable stream.
  },
});

// Listen for the `data` event on the readable stream
readableStream.on("data", (chunk) => {
  console.log("CHUNK", chunk.toString()); 
  // Log each chunk of data read from the readable stream.
  writableStream.write(chunk); 
  // Write the chunk of data to the writable stream.
});

// Push data into the readable stream
readableStream.push("Hello"); 
// Add the string "Hello" to the readable stream's internal buffer, triggering the `data` event.