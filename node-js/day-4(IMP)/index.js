const http = require('http');
const fs = require('fs');
const { Transform , pipeline} = require('stream');

const server = http.createServer((req, res) => {
  // ? -----------1-------------

  // !1. Downloading the file in a bad way ❌
  // const file = fs.readFileSync("sample.txt");
  // res.end(file);

  // **2. Downloading the file in a good way ✅(Stream)

  // const readableStream = fs.createReadStream("sample.txt");
  // readableStream.pipe(res); // pipe method is used to send the data from readable stream to writable stream (response)
  // res.end();

  // ? -----------2-------------
    // !1. Copying the file in a bad way ❌

  // const file = fs.createReadStream("sample.txt");
  // res.writeFileSync("output.txt", file); // writeFileSync is used to write the data to a file
  // res.end("File downloaded successfully"); // send the response to the client

  // **2. Copying the file in a good way ✅(Stream)

  // const readStream = fs.createReadStream("sample.txt");
  // const writeStream = fs.createWriteStream("output.txt");

  // readStream.on("data", (chunk) => {
  //   writeStream.write(chunk); // write method is used to write the data to a file
  // });

  //? -----------3------------- String processing

  const readStream = fs.createReadStream("sample.txt");
  const writeStream = fs.createWriteStream("output.txt");

  // !. Bad way ❌
  // readStream.on("data", (chunk) => {
  //   const modifiedWord = chunk
  //     .toString()
  //     .toUpperCase()
  //     .replaceAll(/ipsum/gi, "Hello");
  //   writeStream.write(modifiedWord); // write method is used to write the data to a file
  // });

  //** Good way ✅(Stream)  
  const transformStream = new Transform({ //transform stream is both readable and writable stream
    transform(chunk, encoding, callback) {
      const modifiedWord = chunk
        .toString()
        .toUpperCase()
        .replaceAll(/ipsum/gi, "Hello");
      callback(null, modifiedWord);
    },
  });

  // readStream.pipe(transformStream).pipe(writeStream);
  // pipeline(readStream, transformStream, writeStream, (err) => {
  //   if (err) {
  //     console.log("Error in pipeline", err);
  //   } else {
  //     console.log("File copied successfully");
  //   }
  // });
  res.end(); // send the response to the client
});

server.listen(3000, () => {
  console.log("Server is connected at 🔥", 3000);
});
