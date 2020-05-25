import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page.vue';
import boardDetails from '../views/board-details.vue';
import taskDetails from '../views/task-details.vue';
import userAuth from '../views/user-auth.vue';
import userList from '../views/user-list.vue';
import boardDashboard from '../views/boad-dashboard.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'homePage',
        component: homePage
    },
    {
        path: '/users',
        name: 'user-list',
        component: userList
    },
    {
        path: '/board/:id/',
        name: 'boardDetails',
        component: boardDetails,
        children: [{
            path: 'task-details/:taskId',
            name: 'taskDetails',
            component: taskDetails
        }]
    },
    {
        path: '/auth',
        name: 'userAuth',
        component: userAuth
    },
    {
        path: '/board/dashboard/:id/',
        name: 'dashboard',
        component: boardDashboard
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router