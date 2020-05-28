const logger = require('../../services/logger.service.js')
const boardService = require('./board.service.js')

async function getBoards(req, res) {
    try {
        // const filterSortObj = req.query;
        // const filterSortStr = filterSortObj.filterSort;
        // const filterSort = JSON.parse(filterSortStr);
        const boards = await boardService.query();
        res.json(boards);
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({error: 'cannot get boards'});

    }
}

async function getBoardsByUser(req, res) {
    try {
        const boards = await boardService.getBoardsByUser(req.params.id);
        res.json(boards);
    } catch (err) {
        logger.error('Cannot get boards by user', err);
        res.status(500).send({error: 'cannot get boards by user'});
    }
}

async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function addBoard(req, res) {
    var board = req.body;
    board = await boardService.add(board);
    res.send(board);
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    res.send(board)
}

async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}

module.exports = {
    getBoards,
    deleteBoard,
    addBoard,
    updateBoard,
    getBoard,
    getBoardsByUser
}