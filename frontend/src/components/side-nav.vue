<template>
    <section>
        <div class="sidenav"
             v-bind:class="{ full: showFull }">
            <a class="text-center cursor-pointer sidebar-el sidebar-toggle"
               v-on:click="showFull = !showFull">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6"
                                   icon="align-justify"></font-awesome-icon>
                <span class="sidenav-text"></span>
            </a>
            <a class="text-center cursor-pointer sidebar-el"
               v-for="nav in navs"
               v-bind:key="nav.icon"
               @click="moveToHref(nav.href)">
                <font-awesome-icon class="stay-in-sample-place"
                                   transform="grow-6"
                                   :icon="nav.icon"></font-awesome-icon>
                <span class="sidenav-text">
                    {{nav.title}}
                </span>
            </a>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'side-nav',
        props: {
            navs: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                showFull: false
            }
        },
        methods: {
            moveToHref(href) {
                if (this.$route.path !== href) {
                    this.$router.push(href);
                }
            }
        }
    }
</script>