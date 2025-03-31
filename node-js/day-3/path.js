const path = require("path");

console.log("FILENAME📂" , __filename) //__filename gives the current file path 
console.log("DIRNAME📂" , __dirname) //__dirname gives the current folder path 


// School management system

//* folders/students/data.txt

// *1. Join()
const filepath = path.join("folder" , "students" , "data.txt")

console.log(filepath)

const parsedDataPath = path.parse(filepath)
const resolvedPath = path.resolve(filepath)
const extname = path.extname(filepath)
const basename = path.basename(filepath)
const dirname = path.dirname(filepath)

console.log({
    parsedDataPath,
    resolvedPath,
    extname,
    basename,
    dirname
})

// JSON.stringify()
// JSON.parse()