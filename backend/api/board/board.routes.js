const express = require('express');
const {addBoard, getBoards, deleteBoard, updateBoard, getBoard, getBoardsByUser} = require('./board.controller');
const router = express.Router();

router.get('/', getBoards);
router.post('/', addBoard);
router.delete('/:id', deleteBoard);
router.put('/:id', updateBoard);
router.get('/:id', getBoard);
router.get('/user/:id', getBoardsByUser);

module.exports = router