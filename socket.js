const socketIO = require('socket.io');
const socket = {}

const connect = (server) => {
    socket.io = socketIO(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"]
        },
        connectTimeout: 2000
    });
}

module.exports = {
    connect,
    socket
}