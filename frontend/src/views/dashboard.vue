<template>
    <section class="user-list">
        <div class="push"></div>
        <h1>
            Dashboard
        </h1>
        <section class="search">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="Search users" @input="filterUsers($event.target.value)"/>
        </section>
        <table>
            <thead>
            <tr>
                <th>Email</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in usersToShow"
                v-bind:key="user._id">
                <td>{{user.email}}</td>
                <td>{{user.username}}</td>
                <td>{{user.firstName}}</td>
                <td>{{user.lastName}}</td>
                <td>
                    <p class="text-center"
                       v-if="user._id === loggedinUser._id">
                        😊
                    </p>
                    <p class="text-center"
                       v-else>
                        <font-awesome-icon icon="trash"></font-awesome-icon>
                    </p>

                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
                usersToShow: [],
                users: [],
                loggedinUser: null,
            }
        },
        methods: {
            async loadAllUsers() {
                this.users = await this.$store.dispatch({
                    type: "getUsers"
                });
                this.usersToShow = this.users;
            },

            async getCurrentUser() {
                this.loggedinUser = await this.$store.getters.loggedinUser;
            },
            async filterUsers(value) {
                let all = this.users;
                if (value) {
                    this.usersToShow = all.filter(e => e.username.startsWith(value) || e.email.startsWith(value) ||
                        e.firstName.startsWith(value) || e.lastName.startsWith(value));
                } else {
                    this.usersToShow = all;
                }
            }
        },
        created() {
            this.getCurrentUser();
            this.loadAllUsers();
        }
    }
</script>