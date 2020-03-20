import Vue from 'vue';
import moment from 'moment';

Vue.filter('dueDate', (timestamp) => {
    return moment(new Date(timestamp)).calendar();
})

Vue.filter('fromDate', (timestamp) => {
    return moment(new Date(timestamp)).fromNow();
})