import http from "http";
import SocketIO from "socket.io"
import express from "express";

const app = express();

app.set("view engine", "pug"); // pug를 view engine으로 설정
app.set("views", __dirname + "/views"); // express에 template가 어디에 있는지 지정
app.use("/public", express.static(__dirname + "/public")); // public url을 생성해서 유저에게 파일 공유
app.get("/", (_, res) => res.render("home")); // home.pug를 render하는 route handler 생성
app.get("/*", (_, res) => res.redirect("/")); // 다른 url을 작성해도 "/" 화면 렌더

const handleListen = () => console.log(`Listening on http://localhost:3001`);

// http 서버 위에 ws 서버 생성
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

/*
* WebSocket 사용
import WebSocket from "ws";

const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser 😵");
}

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "in";
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
      default:
    }
  })
});
*/

httpServer.listen(3001, handleListen); 