const express = require('express');
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { addBoard, getBoards, deleteBoard, updateBoard, getBoard } = require('./board.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards);
router.post('/', addBoard);
router.delete('/:id', deleteBoard);
router.put('/:id', updateBoard);
router.get('/:id', getBoard);

module.exports = router