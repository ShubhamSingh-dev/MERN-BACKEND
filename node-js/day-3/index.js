// !OBJECTIVE
// * CREATE A PROGRAM USING NODE-JS EVENTEMITTER THAT:

// ? LISTENS FOR MULTIPLE TYPES OF USER EVENTS (E.G LOGIN , LOGOUT , PURCHASE , AND PROFILE UPDATE)✅
// ? tRACKS HOW MANY TIMES EACH EVENT IS EMITTED.
// ? LOGS A SUMMARY OF ALL EVENTS OCCURRENCES WHEN A SPECIAL SUMMARRY EVENT IS TRIGGERED


// !REQUIREMENT

// ? create at least four custom events
// ? emit these events multiple times with different argumensts ( e.g username , item purchased)
// ? tracks and store the count of each event type.
// ? define a summary events that logs a detailed report of how many times each event was triggered

const EventEmitter = require("events")
const fs = require("fs")

const userEmitter  = new EventEmitter()

const eventCounts = { //global object to store event counts
    login:0,
    logout:0,
    purchase:0,
    profileupdate:0
}
 
const logFile = "eventlog.json" 
// Define the name of the log file where event counts will be stored persistently.

if(fs.existsSync(logFile)){ // Check if the log file exists
    const data = fs.readFileSync(logFile , "utf-8") 
    // If the file exists, read its contents as a UTF-8 encoded string.
    Object.assign(eventCounts , JSON.parse(data))  //Basically helps to merge the data of two objects by copying the properties of one object into another.
    // Parse the JSON data from the file and merge it into the `eventCounts` object.
    // This ensures that previously saved event counts are loaded into memory.
}

function saveCounts(){
    fs.writeFileSync(logFile , JSON.stringify(eventCounts , null , 2)) 
    // Write the current state of `eventCounts` to the log file in JSON format.
    // The `null` and `2` arguments format the JSON with indentation for readability.
    // This ensures that event counts are saved persistently after every update.
}

// Events creating 
userEmitter.on("LOGIN" , (username)=>{
    eventCounts.login++;
    console.log(`${username} Logged In Successfully✅`)
    saveCounts()
})


userEmitter.on("LOGOUT" , (username)=>{
    eventCounts.logout++
    console.log(`${username} logout In Successfully❌`)
    saveCounts()
})

userEmitter.on("PURCHASE" , (username , item)=>{
    eventCounts.purchase++
    console.log(`${username} purchased ${item}`)
    saveCounts()
})

userEmitter.on("PROFILE_UPDATE" , (username , field)=>{
    eventCounts.profileupdate++
    console.log(`${username} updated their profile field: ${field}`)
    saveCounts()
})


userEmitter.on("SUMMARY" , ()=>{
    console.log("\n Event Summary:")
    console.log(`Logins: ${eventCounts.login}`)
    console.log(`Logouts: ${eventCounts.logout}`)
    console.log(`Purchases: ${eventCounts.purchase}`)
    console.log(`Proifle Update: ${eventCounts.profileupdate}`)
})


// emit events with different arguments


userEmitter.emit("LOGIN" , "Shubham")
userEmitter.emit("LOGOUT" ,"Shubham" )
userEmitter.emit("PURCHASE" , "Shubham" , "Iphone16")
userEmitter.emit("PROFILE_UPDATE" , "Shubham" , "Email Address")

userEmitter.emit("SUMMARY")