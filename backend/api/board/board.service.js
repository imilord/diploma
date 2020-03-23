const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    const criteria = _buildCriteria()
    const collection = await dbService.getCollection('board')
    try {
        const boards = await collection.find(criteria).toArray();
        // if (filterSort.sortBy) {
        //     _sortTots(filterSort.sortBy, toys)
        // }
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}


async function add(board) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board;

    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);

    try {
        await collection.replaceOne({ "_id": board._id }, { $set: board })
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

function _buildCriteria(filterSort) {
    // const filterBy = filterSort.filterBy;
    const criteria = {};
    // if (filterBy.name) criteria.name = { $regex: filterBy.name };
    // if (filterBy.type !== 'All') criteria.type = filterBy.type;
    // if (filterBy.inStock !== 'All') {
    //     const bool = (filterBy.inStock === 'In stock');
    //     criteria.inStock = bool;
    // }

    return criteria;
}

// function _sortTots(sort, toys) {
//     if (sort === 'name') {
//         _sortByName(toys);
//     } else if (sort === 'price') {
//         _sortByPrice(toys);
//     }
// }

// function _sortByName(toys) {
//     toys.sort(function(a, b) {
//         var nameA = a.name.toUpperCase();
//         var nameB = b.name.toUpperCase();
//         if (nameA < nameB) {
//             return -1;
//         }
//         if (nameA > nameB) {
//             return 1;
//         }

//         return 0;
//     });
// }

// function _sortByPrice(toys) {
//     toys.sort(function(a, b) {
//         return a.price - b.price;
//     });
// }

module.exports = {
    query,
    remove,
    add,
    update,
    getById
}