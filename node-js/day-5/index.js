//learning crypto module in nodejs
const crypto = require("crypto")

// 1. randomBytes
const randomvalues = crypto.randomBytes(100);
//gives buffer output

console.log(randomvalues.toString("hex"))


// 2. createHash

// const hashvalue = crypto.createHash("sha256").update("Suraj").digest("hex")

// const inputValue = "Surajs"
// const matchValue = crypto.createHash("sha256").update(inputValue).digest("hex")


// if(hashvalue === matchValue){
//     console.log("you can login")
// }
// else{
//     console.log("Something went wrong")
// }

// *what is encryption and decryption ?

