const EventEmitter = require("events") 

const emitter  = new EventEmitter()

//*on(eventName , callback function) =>> to listen to the event or create

emitter.on("GREET" , (args)=>{
    console.log(`Hello World ${args.username} and the id is ${args.id}`)
})

//*emit(eventName , data) =>> to emit the event or execute
emitter.emit("GREET" ,{
    username:"Suraj",
    id:"10asldhasildh9021873nlkasc"
})

//we can send data one by one but good practice is to send as an object
// emitter.emit("GREET" , "Suraj" , "10asldhasildh9021873nlkasc")