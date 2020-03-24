module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('board topic', boardId => {
            if (socket.myBoard) {
                socket.leave(socket.myBoard)
            }
            socket.join(boardId)
            socket.myBoard = boardId;
        })
        socket.on('update board', board => {
            io.to(socket.myBoard).emit('update newBoard', board)
        })
    })
}