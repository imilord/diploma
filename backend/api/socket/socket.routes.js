
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('board topic', boardId=> {
            if (socket.myBoard) {
                socket.leave(socket.myBoard)
            }
            socket.join(boardId)
            socket.myBoard = boardId;
            // io.to(socket.myBoard).emit('topic-loaded', board)
        })
        socket.on('update board', board => {
            console.log(board)
            io.to(socket.myBoard).emit('update newBoard', board)
        })

    })
}