import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let user = 0;
let allSoket = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
    });
    socket.on("disconnect", () => {
        allSoket = allSoket.filter((s) => s != socket);
    });
});
//# sourceMappingURL=index.js.map