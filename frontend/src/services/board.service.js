import httpService from './http.service.js';
import { utilService } from './util.service.js';

const endpoint = 'boards';

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyTasksList,
    getEmptyTask
}

function query() {
    return httpService.get(endpoint);
}

function getById(id) {
    return httpService.get(`${endpoint}/${id}`);
}

function remove(id) {
    return httpService.delete(`${endpoint}/${id}`);
}

function save(board) {
    if (board._id) {
        return httpService.put(`${endpoint}/${board._id}`, board);
    } else {
        return httpService.post(`${endpoint}`, board);
    }

}

function getEmptyBoard() {
    return {
        name: "",
        members: [],
        tags: [],
        style: { "color": "white", "url": "" },
        creator: {
            id: "",
            name: "",
            img: ""
        },
        dueDate: "",
        description: "",
        taskLists: []
    }
}

function getEmptyTasksList() {
    return {
        id: utilService.makeId(),
        name: "",
        bakegroundColor: "hsla(0,0%,100%,.3)",
        sortBy: "",
        tasks: []
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        name: "",
        description: "",
        dueDate: "",
        createdAt: Date.now(),
        members: [],
        labels: [{
            color: "",
            title: ""
        }],
        comments: [{
            createdBy: "",
            txt: "",
            createdAt: ""
        }],
        activitiesLog: [],
        cover: "",
        attachment: {},
        checkList: {}
    }
}