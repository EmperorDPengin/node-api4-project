const { nanoid }  = require('nanoid');

function getId() {
    return nanoid().slice(0,5);
}

const initializeUsers = () => ([
    { id: getId(), username: 'foo', password:'123'},
    { id: getId(), username: 'theo', password: '456'},
    { id: getId(), username: 'pengin', password: '789'}
]);

let users = initializeUsers();

const find = () => {
    return Promise.resolve(users);
}

const findById = (id) => {
    const user = users.find(user => user.id === id);
    return Promise.resolve(user);
}

const findBy = (filter) => {
    const user = users.find(user => user.username === filter);
    return Promise.resolve(user);
}

const addUser = (newUserInfo) => {
    let newUser = {id: getId(), username: newUserInfo.username, password: newUserInfo.password};
    users.push(newUser);
    return Promise.resolve(newUser);
}

module.exports = { 
                find,
                findById,
                findBy,
                addUser, }