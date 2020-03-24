module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('board topic', boardId => {
            if (socket.myBoard) {
                socket.leave(socket.myBoard)
            }
            socket.join(boardId)
            socket.myBoard = boardId;
            console.log(  socket.myBoard)
        })
        socket.on('update board', board => {
            io.to(socket.myBoard).emit('update newBoard', board)
        })
    })
}