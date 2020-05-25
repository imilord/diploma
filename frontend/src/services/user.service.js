import httpService from './http.service.js';

export default {
    login,
    logout,
    signup,
    update,
    getById,
    getUsers
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred);
    return _handleLogin(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred);
    if (user) {
        return _handleLogin(user)
    } else {
        return null;
    }
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function update(user) {
    _handleLogin(user);
    return httpService.put(`user/${user._id}`, user)
}

function getUsers() {
    return httpService.get('user');
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}