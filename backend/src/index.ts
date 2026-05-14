import {WebSocketServer, WebSocket} from "ws";

const wss=new WebSocketServer({port:8080})

interface User{
    socket:WebSocket;
    room:string;
    name:string
}

let allSoket:User[] = [];

wss.on("connection",(socket)=>{
    socket.on("message", (message) => {
        const parsedMsg=JSON.parse(message.toString())
        if(parsedMsg.type==='join'){
            allSoket.push({
                socket,
                room:parsedMsg.payload.roomId,
                name: parsedMsg.payload.name
            })
        }

        if(parsedMsg.type==='chat'){
            const currentUser=allSoket.find((x)=>x.socket==socket)
            const currentUserRoom = currentUser?.room;
            allSoket.filter((x)=>x.room===currentUserRoom).forEach((x)=>x.socket.send(JSON.stringify({
                            message: parsedMsg.payload.message,
                            name: currentUser?.name
                        })))
        }
    });
})
