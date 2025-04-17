CReating TAsk Manager
create a folder
npm init --y
then install dependencies , express cookie-parser express-session uuid
uuid is used to crete ?
chnage common js to module , main to server.js
dev : nodmeon src/server.js

make basic express route in server.j s
make src folder and sub folder
middleware , routes , utils , controller  
controller dir is used for ?
controller basicaly contains are callbak function of our routes that is
app.get("/bla",(req,res)={})
this is the callback function: (req,res)={}

by making a auth.controller.js file and writing
export const BAA = (req, res) => {
res.send("Login successfully");
};

nowimporting in routes
app.get("/bla", bAA)



