module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('board topic', boardId => {
            console.log('in socket id', boardId)
            if (socket.myBoard) {
                socket.leave(socket.myBoard)
            }
            socket.join(boardId)
            socket.myBoard = boardId;
        })
        socket.on('update board', board => {
            console.log('in socket ', board)
            io.to(socket.myBoard).emit('update newBoard', board)
        })

    })
}