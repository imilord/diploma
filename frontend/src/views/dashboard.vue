<template>
    <section class="user-list">
        <div class="push"></div>
        <h1>
            Dashboard
        </h1>
        <div class="row">
            <div class="card col">
                <div class="container">
                    <h4><b>TOTAL PROJECTS</b></h4>
                    <p>{{projects.length}}</p>
                </div>
            </div>
            <div class="card col">
                <div class="container">
                    <h4><b>TOTAL MANAGERS</b></h4>
                    <p>{{managersCount}}</p>
                </div>
            </div>
            <div class="card col">
                <div class="container">
                    <h4><b>TOTAL MEMBERS</b></h4>
                    <p>{{all}}</p>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="small" v-if="lineDataCollection">
                <line-chart :chart-data="lineDataCollection"></line-chart>
            </div>
            <div class="small" v-if="pieDatacollection">
                <pie-chart :chart-data="pieDatacollection"></pie-chart>
            </div>
        </div>
        <section class="search">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="Search users" @input="filterUsers($event.target.value)"/>
        </section>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Members count</th>
                <th>Creator</th>
                <th>Created at</th>
                <th>Deadline</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="project in projectsToShow"
                v-bind:key="project._id">
                <td>{{project.name}}</td>
                <td>{{project.members.length}}</td>
                <td>{{project.creator.username}}</td>
                <td>{{timeConverter(project.createdAt)}}</td>
                <td>{{timeConverter(project.dueDate)}}</td>
                <td>
                    <router-link :to="'/board/' + project._id ">
                        <a class="button add-btn">View project</a>
                    </router-link>
                    <a @click="pushData(project)" class="button add-btn">Choose</a>
                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    import LineChart from '../charts/LineChart.js'
    import PieChart from '../charts/PieChart.js'

    export default {
        name: "project-list",
        data() {
            return {
                projectsToShow: [],
                projects: [],
                loggedinUser: null,
                lineDataCollection: null,
                pieDatacollection: null,
            }
        },
        computed: {
            all() {
                return this.projects.length ? this.projects.reduce((a, b) => {
                    return a.members.length + b.members.length
                }) : 0
            },
            managersCount() {
                var all = 0;
                for (let i = 0; i < this.projects.length; i++) {
                    const project = this.projects[i];
                    if (project.members) {
                        for (let j = 0; j < project.members; j++) {
                            const member = project.members[j];
                            if (member.role === 'manager') {
                                all++;
                            }
                        }
                    }
                }
                return all;
            },
        },
        mounted() {
            this.fillData();
        },
        methods: {

            async getCurrentUser() {
                this.loggedinUser = await this.$store.getters.loggedinUser;
            },
            async loadAllProjectsByUser(userId) {
                this.projects = await this.$store.dispatch({
                    type: "loadBoardsByUser",
                    userId
                });
                this.projectsToShow = this.projects;
            },
            async filterProjects(value) {
                let all = this.projects;
                if (value) {
                    this.projectsToShow = all.filter(e => e.creator.username.startsWith(value) || e.name.startsWith(value));
                } else {
                    this.projectsToShow = all;
                }
            },
            timeConverter(UNIX_timestamp) {
                if (!UNIX_timestamp) {
                    return '';
                }
                var a = new Date(UNIX_timestamp);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            },
            timeConverterWithoutTime(UNIX_timestamp) {
                if (!UNIX_timestamp) {
                    return '';
                }
                var a = new Date(UNIX_timestamp);
                return a.toDateString();
            },
            pushData(project) {
                var usersMap = new Map();
                const taskLists = project.taskLists;
                let completed = 0;
                let incomplete = 0;
                for (var i = 0; i < taskLists.length; i++) {
                    const taskList = taskLists[i];
                    for (var j = 0; j < taskList.tasks.length; j++) {
                        const task = taskList.tasks[j];
                        if (task.status.isDone) {
                            completed++;
                            if (task.status.member) {
                                const member = task.status.member;
                                if (usersMap.has(member.username)) {
                                    let arr = usersMap.get(member.username);
                                    arr.push(this.timeConverterWithoutTime(task.status.date));
                                    usersMap.set(member.username, arr);
                                } else {
                                    usersMap.set(member.username, []);
                                }
                            }
                        } else {
                            incomplete++;
                        }
                    }
                }
                console.log(usersMap);
                this.pieDatacollection = {
                    datasets: [{
                        data: [
                            incomplete,
                            completed
                        ],
                        backgroundColor: [
                            '#f87979',
                            '#90f82b',
                        ],
                    }],
                    labels: [
                        'Incomplete',
                        'Completed',
                    ]
                };

                this.lineDataCollection = {
                    labels: [this.getRandomInt(), this.getRandomInt()],
                    datasets: [
                        {
                            label: 'Data One',
                            data: [this.getRandomInt(), this.getRandomInt()],
                            fill: false,
                        }, {
                            label: 'Data One',
                            data: [this.getRandomInt(), this.getRandomInt()],
                            fill: false,
                        }
                    ]
                };
            },
            fillData() {
                this.lineDataCollection = {};
                this.pieDatacollection = {
                    datasets: [{
                        data: [
                            0,
                            0
                        ],
                        backgroundColor: [
                            '#f87979',
                            '#90f82b',
                        ],
                    }],
                    labels: [
                        'Incomplete',
                        'Completed',
                    ]
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        },
        created() {
            this.getCurrentUser().then(() => {
                this.loadAllProjectsByUser(this.loggedinUser._id);
            });

        },
        components: {
            LineChart,
            PieChart,
        },
    }
</script>

<style>
    .center {
        display: flex;
    }

    .small {
        left: 20px;
        max-width: 600px;
        max-height: 600px;
        margin-right: auto;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 100px;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .container {
        padding: 2px 16px;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -20px;
    }

    .row > .col {
        flex: 1 1 30%; /*grow | shrink | basis */
        width: 33%;
        margin: 0 20px;
        padding: 20px 0;
    }

</style>