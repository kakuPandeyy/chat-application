const express = require('express');
const mongoose = require("mongoose");
var cors = require("cors");
const registerRoute = require("./routes/userRoutes")
const messageRoute = require("./routes/messageRoute");
const socket = require("socket.io")
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({limit: "10mb", extended: true}))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connnect succesfuly")
}).catch((err)=>{
    console.log("unable to connect" + err.message)
})

app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use("/api/auth",registerRoute)
app.use("/api/message",messageRoute)

const server =  app.listen(process.env.PORT,()=>{
    console.log(`sever is runing on port ${process.env.PORT}`)
})
const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})

global.onlineUser = new Map();



function removerOffliner(idToRemove,fromArry){
   
const ind = fromArry.indexOf( idToRemove )

if (ind > -1) {
    fromArry.splice(ind, 1);
  }else{
   
  }
  return fromArry;
}

function showOnlineUsers(socket,arryToShow,onlineUser) {
    const arry = arryToShow.map((userrId)=>{      
           return {online:true,userId:userrId} 
                })
                onlineUser&&socket.broadcast.emit("showOnline",arry)&&socket.emit("showOnline",arry)
        
}

io.on("connect",async (socket)=>{
    global.chatSocket = socket;
  
    socket.on("addUser",(userId)=>{
        onlineUser.set(userId,socket.id)
    
        try {
            const onlinePeople = Object.fromEntries(onlineUser)
            const onlinePeopleIds = Object.keys(onlinePeople)
           
            showOnlineUsers(socket,onlinePeopleIds,onlineUser)     
        socket.on("disconnect",()=>{
    
     const newOnlines =  removerOffliner(userId,onlinePeopleIds)

     showOnlineUsers(socket,newOnlines,onlineUser)


        })
        } catch (error) {
            console.log(error)
        }
   
    
    })
    
    try {
        socket.on("sendMsg",async (data)=>{
            try {
                onlineUser.set(data.from,socket.id)
            
                const sendUserSocket = await onlineUser.get(data.to)
        
                if(sendUserSocket){
                    socket.to(sendUserSocket).emit("msgRecieve",data)
                 
                  
                } 
            } catch (error) {
                console.log(error)
            }
            
        })
    } catch (error) {
        console.log(error)
    }
    
})

