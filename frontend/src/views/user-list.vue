<template>
    <section class="user-list">
        <div class="push"></div>
        <h1>
            Users list
        </h1>
        <section class="search">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="Search users"/>
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
            <tr v-for="user in users"
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
        name: "user-list",
        data() {
            return {
                users: [],
                loggedinUser: null,
            }
        },
        methods: {
            async loadAllUsers() {
                this.users = await this.$store.dispatch({
                    type: "getUsers"
                });
            },

            async getCurrentUser() {
                this.loggedinUser = await this.$store.getters.loggedinUser;
            }
        },
        created() {
            this.getCurrentUser();
            this.loadAllUsers();
        }
    }
</script>