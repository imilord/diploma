const express = require('express');
const { addBoard, getBoards, deleteBoard, updateBoard, getBoard } = require('./board.controller');
const router = express.Router();

router.get('/', getBoards);
router.post('/', addBoard);
router.delete('/:id', deleteBoard);
router.put('/:id', updateBoard);
router.get('/:id', getBoard);

module.exports = router