const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("view", __dirname + "/src/views");
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
console.log("hello", handleListen);

let server = app.listen(3000);

module.exports = server;