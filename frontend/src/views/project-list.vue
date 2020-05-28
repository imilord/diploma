<template>
    <section class="project-list">
        <div class="push"></div>
        <h1>
            Projects list
        </h1>
        <section class="search">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="Search projects" @input="filterProjects($event.target.value)"/>
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
                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        name: "project-list",
        data() {
            return {
                projectsToShow: [],
                projects: [],
                loggedinUser: null,
            }
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
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                return time;
            }

        },
        created() {
            this.getCurrentUser().then(() => {
                this.loadAllProjectsByUser(this.loggedinUser._id);
            });

        }
    }
</script>