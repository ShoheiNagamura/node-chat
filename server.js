const express = require("express");
const app = express();
const http = require("http");
const { Socket } = require("socket.io");
const server = http.createServer(app);
const io = require("socket.io")(server)

app.use(express.json());
const PORT = 3002;



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//io.onでクライアント側と繋がる
io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");

    //クライアント側から送られてきたvalueを受け取り、msgに入る
    socket.on("chat messages", (msg) => {
        // console.log("受けっとったメッセージです→" + msg);

        //クライアントから受けっとvalueをさらにクライアントに返してみれるようにする
        io.emit("chat message", msg);
    })
})

// サーバー起動
server.listen(PORT, () => {
    console.log("サーバー起動");
});