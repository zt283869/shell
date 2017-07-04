var WebSocket = require("ws");
var Server = new WebSocket.server({port:8000});
Server.on("connection",(ws)=>{
    ws.on("message",(data)=>{
        Server.clients.forEach((client)=>{
            if(client !== ws && client.readyState === Websocket.OPEN){
                client.send("broadcat:"+data);
            }

            })
        ws.send(data);
    })
})
console.log("websocket is ready on prot 8000")

