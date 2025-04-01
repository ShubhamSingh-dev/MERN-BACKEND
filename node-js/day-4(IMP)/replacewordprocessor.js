const { Transform } = require("stream");
// Import the `Transform` class from the Node.js `stream` module.
// The `Transform` stream is used to modify or transform data as it is being read or written.

// Create a new Transform stream instance
const transformStream = new Transform({
  // Define the `transform` method, which is called for each chunk of data
  transform(chunk, encoding, callback) {
    // Convert the chunk (Buffer) to a string, transform it to uppercase,
    // and replace all occurrences of the word "ipsum" (case-insensitive) with "Hello".
    const modifiedWord = chunk
      .toString() // Convert the chunk to a string
      .toUpperCase() // Convert the string to uppercase
      .replaceAll(/ipsum/gi, "Hello"); // Replace all occurrences of "ipsum" (case-insensitive) with "Hello"

    // Pass the transformed data to the next stage in the stream pipeline
    callback(null, modifiedWord);
  },
});

// Export the `transformStream` so it can be used in other parts of the application
module.exports = transformStream;