import {WebSocketServer, WebSocket} from "ws";

const wss=new WebSocketServer({port:8080})

interface User{
    socket:WebSocket;
    room:string
}

let allSoket:User[] = [];

wss.on("connection",(socket)=>{
    socket.on("message", (message) => {
        const parsedMsg=JSON.parse(message.toString())
        if(parsedMsg.type==='join'){
            allSoket.push({
                socket,
                room:parsedMsg.payload.roomId
            })
        }

        if(parsedMsg.type==='chat'){
            const currentUserRoom=allSoket.find((x)=>x.socket==socket)
        }
    });
})
