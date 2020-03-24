var localLoggedinUser = { username: 'guest' };
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser: localLoggedinUser
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser;
        }
    }
}