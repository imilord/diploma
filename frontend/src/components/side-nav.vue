<template>
    <section>
        <div class="sidenav"
             v-bind:class="{ full: showFull }"
             v-on:click="showFull = !showFull">
            <a class="text-center cursor-pointer sidebar-el sidebar-toggle">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6"
                                   icon="align-justify"></font-awesome-icon>
                <span class="sidenav-text"></span>
            </a>
            <a class="text-center cursor-pointer sidebar-el">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6" icon="home"></font-awesome-icon>
                <span class="sidenav-text">
                    Dashboard
                </span>
            </a>
            <a class="text-center cursor-pointer sidebar-el">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6" icon="plus"></font-awesome-icon>
                <span class="sidenav-text">
                    Projects
                </span>
            </a>
            <a class="text-center cursor-pointer sidebar-el">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6" icon="users"></font-awesome-icon>
                <span class="sidenav-text">
                    Users
                </span>
            </a>
            <a class="text-center cursor-pointer sidebar-el">
                <font-awesome-icon class="stay-in-sample-place" transform="grow-6" icon="upload"></font-awesome-icon>
                <span class="sidenav-text">
                    Upload
                </span>
            </a>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'side-nav',
        data() {
            return {
                showFull: false
            }
        },
    }
</script>