import { boardService } from '../services/board.service.js';
import { utilService } from '../services/util.service.js';
// import socketService from '../services/socket.service.js';

export default {
    state: {
        board: null,
        currTask: null,
        currList: null,
        currChecklist: null,
        currId: ''
    },
    getters: {
        currTask(state) {
            return state.currTask;
        },
        currList(state) {
            return state.currList;
        },
        currChecklist(state) {
            return state.currChecklist;
        },
        currId(state) {
            return state.currId;
        }
    },
    mutations: {
        setEmptyTask(state) {
            const task = boardService.getEmptyTask();
            state.currTask = task;
        },
        setEmptyTasksList(state) {
            const list = boardService.getEmptyTasksList();
            state.currList = list;
        },
        setEmptyChecklist(state) {
            const checklist = boardService.getEmptyChecklist();
            state.currChecklist = checklist;
        },
        setListAndTask(state, { taskId }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                state.currTask = list.tasks.find(task => task.id === taskId);
                if (state.currTask) {
                    state.currList = state.board.taskLists[i]
                    return;
                }
            }
        },
        setBoard(state, { board }) {
            state.board = board;
        },
        addTask(state, { taskData }) {
            const taskList = state.board.taskLists.find(taskList => taskList.id === taskData.taskListId);
            taskList.tasks.push(taskData.newTask);
        },
        addTasksList(state, { listData }) {
            state.board.taskLists.push(listData);
        },
        updateBoard(state, { board }) {
            state.board = board;
        },
        updateTask(state, { task }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                const taskIdx = list.tasks.findIndex(currTask => currTask.id === task.id);
                if (taskIdx >= 0) {
                    state.board.taskLists[i].tasks.splice(taskIdx, 1, task);
                    return;
                }
            }
        },
        deleteTask(state, { task }) {
            for (var i = 0; i < state.board.taskLists.length; i++) {
                const list = state.board.taskLists[i];
                const taskIdx = list.tasks.findIndex(currTask => currTask.id === task.id);
                if (taskIdx >= 0) {
                    state.board.taskLists[i].tasks.splice(taskIdx, 1);
                    return;
                }
            }

            state.currTask = null;
        },
        deleteList(state, { listId }) {
            const listIdx = state.board.taskLists.findIndex(currList => currList.id === listId)
            if (listIdx >= 0) {
                state.board.taskLists.splice(listIdx, 1);
                return;
            }
        },
        getId(state) {
            const id = utilService.makeId();
            state.currId = id
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            const board = await boardService.getById(boardId);
            context.commit({ type: 'setBoard', board });
            return board;
        },
        async addTask(context, { taskData }) {
            context.commit({
                type: 'addTask',
                taskData
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async addTasksList(context, { listData }) {
            context.commit({
                type: 'addTasksList',
                listData
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async updateBoard(context, { board }) {
            context.commit({
                type: 'updateBoard',
                board
            });
            const savedBoard = await boardService.save(board);
            // socketService.emit("update board", savedBoard);
            return savedBoard;
        },
        async updateTask(context, { task }) {
            context.commit({
                type: 'updateTask',
                task
            });
            await boardService.save(context.state.board);
            return task;
        },
        async deleteTask(context, { task }) {
            context.commit({
                type: 'deleteTask',
                task
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async deleteList(context, { listId }) {
            context.commit({
                type: 'deleteList',
                listId
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        },
        async uploadImg(context, { ev }) {
            const res = await utilService.uploadImg(ev);
            const { url } = res;
            return url;
        },
        async copyTask(context, { taskData }) {
            taskData.newTask.id = utilService.makeId();
            context.commit({
                type: 'addTask',
                taskData
            });
            const savedBoard = await boardService.save(context.state.board);
            return savedBoard;
        }
    }
}