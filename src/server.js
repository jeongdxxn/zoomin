import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

// pug를 view engine으로 설정
app.set("view engine", "pug");
// express에 template가 어디에 있는지 지정
app.set("views", __dirname + "/views");
// public url을 생성해서 유저에게 파일 공유
app.use("/public", express.static(__dirname + "/public"));
// home.pug를 render하는 route handler 생성
app.get("/", (req, res) => res.render("home"));
// 다른 url을 작성해도 "/" 화면 렌더
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버 위에 ws 서버 생성
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser 👍");
  socket.on("close", () => console.log("Disconnected from the Browser 😵"))
  socket.on("message", (message) => {
    console.log(message);
  })
  socket.send("hello!!");
});

server.listen(3000, handleListen);