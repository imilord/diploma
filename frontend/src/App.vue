<template>
    <section>
        <side-nav :navs="navs" v-if="user"></side-nav>
        <div class="main">
            <main-nav :user="user" @logout="doLogout" :class="{ isTaskOpen: isTaskOpen }"></main-nav>
            <router-view :key="reload"></router-view>
        </div>
    </section>
</template>

<script>
    import mainNav from "./components/main-nav.vue";
    import sideNav from "./components/side-nav.vue";

    export default {
        data() {
            return {
                user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)),
                isTaskOpen: false,
                reload: 0,
                navs: []
            };
        },
        mounted: function () {
            this.checkNavs();
        },
        methods: {
            async doLogout() {
                await this.$store.dispatch({type: "logout"});
                this.user = this.$store.getters.loggedinUser;
                if (this.$route.params.id) {
                    this.$router.push("/");
                } else {
                    this.reload += 1;
                }
                this.checkNavs();
            },
            checkNavs() {
                if (this.user.username !== 'guest') {
                    this.navs = [
                        {
                            icon: 'home',
                            href: '/dashboard',
                            title: 'Dashboard',
                        },
                        {
                            icon: 'table',
                            href: '/',
                            title: 'Boards',
                        },
                        {
                            icon: 'users',
                            href: '/users',
                            title: 'Users',
                        },
                        {
                            icon: 'plus',
                            href: '/projects',
                            title: 'Projects',
                        },
                        {
                            icon: 'upload',
                            href: '/upload',
                            title: 'Upload',
                        },
                    ]
                } else {
                    this.navs = []
                }
            }
        },
        watch: {
            "$route.params": function (newVal) {
                if (newVal.taskId) this.isTaskOpen = true;
                if (!newVal.taskId) this.isTaskOpen = false;
                this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
                this.checkNavs();
            }
        },
        components: {
            mainNav,
            sideNav
        }
    };
</script>

<style scoped>
    .isTaskOpen {
        display: none;
    }

</style>