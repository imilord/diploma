import userService from '../services/user.service.js';

var localLoggedinUser = {username: 'guest'};

if (sessionStorage.user) {
    var tempUser = null;
    try {
        tempUser = JSON.parse(sessionStorage.user);
        localLoggedinUser = tempUser;
    } finally {

    }
}

export default {
    state: {
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser;
        },
        users(state){
            return state.users;
        }
    },
    mutations: {
        setUser(state, {user}) {
            if (user) {
                state.loggedinUser = user;
            } else {
                state.loggedinUser = localLoggedinUser;
            }
        },
        setUsers(state, {users}) {
            state.users = users;
        }
    },
    actions: {
        async login(context, {userCred}) {
            const user = await userService.login(userCred);
            context.commit({type: 'setUser', user});
            return user;
        },
        async signup(context, {userCred}) {
            const user = await userService.signup(userCred);
            context.commit({type: 'setUser', user});
            return user;
        },
        async logout(context) {
            await userService.logout();
            context.commit({type: 'setUser', user: {username: 'guest'}});
        },
        async getUsers(context) {
            const users = await userService.getUsers();
            context.commit({type: 'setUsers', users});
            return users;
        },
        async updateUser(context, {user}) {
            user = await userService.update(user);
            context.commit({type: 'setUser', user});
            return user;
        }
    }
}