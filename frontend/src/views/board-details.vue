<template>
    <section class="board-details" v-if="board" :style="{background: boardStyle}">
        <div class="push"></div>
        <board-nav
                :boardName="board.name"
                :members="board.members"
                :dueDate="board.dueDate"
                :creator="board.creator"
                @username-changed="filterTasks"
                @toggle-activitylog="toggleActivitylog"
                @toggle-settings="toggleSettings"
                @update-boardname="updateBoardname"
                @add-member="addMember"
        ></board-nav>
        <add-member
                v-if="isAddMember"
                :users="users"
                :members="board.members"
                @add-new-member="addNewMember"
                @remove-member="removeMember"
                @close-add-member="isAddMember=false"
        ></add-member>
        <transition name="slide" appear>
            <board-settings
                    v-if="isOpenBoardSetting"
                    :board="board"
                    :class="{'board-settings-open': isOpenBoardSetting}"
                    @toggle-settings="toggleSettings"
                    @set-bgc="setBgc"
                    @delete-board="deleteBoard"
                    @change-date="changeDate"
                    @update-boardname="updateBoardname"
            ></board-settings>
        </transition>
        <transition name="slide" appear>
            <activitylog
                    v-if="isOpenActivitylog"
                    class="main-activitylog"
                    :isMain="true"
                    :activitieslog="board.activitieslog"
                    @close-activitylog="toggleActivitylog"
            ></activitylog>
        </transition>
        <tasklist-list
                :taskLists="taskLists"
                :boardId="board._id"
                @update-board="updateLocalBoard"
                @update-lists="updateLists"
                @upadte-activitylog="upadteActivitylog"
        ></tasklist-list>
        <section class="msger">
            <header class="msger-header">
                <div class="msger-header-title">
                    <i class="fas fa-comment-alt"></i>Chat
                    <p id="count"></p>
                </div>
                <div class="msger-header-options">
                    <span><i class="fas fa-cog"></i></span>
                </div>
            </header>

            <main class="msger-chat">
                <div v-if="messages">
                <span class="msg" v-for="message in messages" v-bind:key="message.id">
                    <i>{{message.content}}</i>
                </span>
                </div>
            </main>

            <div class="msger-inputarea">
                <input type="text"
                       class="msger-input"
                       id="message-input"
                       @keyup="addMessage($event)"
                       placeholder="Enter your message...">
            </div>
            <p id="info"></p>
        </section>

        <router-view></router-view>
    </section>
</template>

<script>
    import boardNav from "../components/board-nav.vue";
    import tasklistList from "../components/tasklists-list.vue";
    import activitylog from "../components/activitylog.vue";
    import boardSettings from "../components/board-settings.vue";
    import addMember from "../components/add-member.vue";
    import socketService from "../services/socket.service.js";

    export default {
        name: "board-details",
        data() {
            return {
                board: null,
                taskLists: [],
                isTaskOpen: false,
                isDrop: true,
                isOpenActivitylog: false,
                isOpenBoardSetting: false,
                isAddMember: false,
                users: [],
                messages: [],
                loggedinUser: null
            };
        },
        computed: {
            boardStyle() {
                var style;
                if (this.board.style.color) style = this.board.style.color;
                else if (this.board.style.url)
                    style = `url("${this.board.style.url}") no-repeat fixed 100%`;
                return style;
            }
        },
        methods: {
            async getCurrentUser() {
                this.loggedinUser = await this.$store.getters.loggedinUser;
            },
            updateLocalBoard(board) {
                this.board = board;
                this.taskLists = this.board.taskLists;
                this.messages = this.board.messages;
            },
            async updateBoard() {
                const board = JSON.parse(JSON.stringify(this.board));
                await this.$store.dispatch({
                    type: "updateBoard",
                    board
                });
                socketService.emit(
                    "update board",
                    JSON.parse(JSON.stringify(this.board))
                );
            },
            updateLists(lists) {
                this.board.taskLists = lists;
                this.taskLists = this.board.taskLists;
                this.updateBoard();
            },
            async filterTasks(value) {
                let allTasks = this.board.taskLists;
                if (value) {
                    this.taskLists = allTasks.filter(e => e.name.startsWith(value));
                } else {
                    this.taskLists = allTasks;
                }
            },
            async upadteActivitylog(activitylog) {
                this.$store.commit({
                    type: "updateActivitieslog",
                    activitylog
                });

                this.board.activitieslog = JSON.parse(JSON.stringify(this.$store.getters.board.activitieslog));
                this.updateBoard();
            },
            toggleActivitylog() {
                this.isOpenActivitylog = !this.isOpenActivitylog;
            },
            toggleSettings() {
                this.isOpenBoardSetting = !this.isOpenBoardSetting;
            },
            setBgc(bgc) {
                this.board.style = bgc;
                this.updateBoard();
            },
            changeDate(newDate) {
                this.board.dueDate = newDate;
                this.updateBoard();
            },
            async deleteBoard() {
                await this.$store.dispatch({
                    type: "deleteBoard",
                    boardId: this.board._id
                });
                this.$router.push(`/`);
            },
            async updateBoardname(newBoardname) {
                this.board.name = newBoardname;
                await this.$store.dispatch({
                    type: "updateBoard",
                    board: this.board
                });
            },
            async addMember() {
                const users = await this.$store.dispatch({
                    type: "getUsers"
                });

                this.isAddMember = true;
                this.users = users;
            },
            async addNewMember(user) {
                const member = {
                    _id: user._id,
                    username: user.username,
                    imgUrl: user.imgUrl
                };

                this.board.members.push(member);

                await this.$store.dispatch({
                    type: "updateBoard",
                    board: this.board
                });
            },
            async removeMember(member) {
                const memberIdx = this.board.members.findIndex(
                    currMember => currMember._id === member._id
                );

                this.board.members.splice(memberIdx, 1);

                await this.$store.dispatch({
                    type: "updateBoard",
                    board: this.board
                });
            },
            async addMessage($event) {
                if ($event.keyCode == 13) {
                    if (this.loggedinUser && $event.target.value) {
                        if (!this.messages) {
                            this.messages = [];
                        }
                        this.messages.unshift({
                            content: this.loggedinUser.username + ': ' + $event.target.value,
                            id: this.uuidv4()
                        });
                        $event.target.value = '';
                        this.board.messages = this.messages;
                        await this.$store.dispatch({
                            type: "updateBoard",
                            board: this.board
                        });
                        socketService.emit(
                            "update board",
                            JSON.parse(JSON.stringify(this.board))
                        );
                    }
                }
            },
            uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        },
        async created() {
            this.getCurrentUser();
            const boardId = this.$route.params.id;
            const board = await this.$store.dispatch({
                type: "loadBoard",
                boardId
            });
            this.board = JSON.parse(JSON.stringify(board));
            this.taskLists = this.board.taskLists;
            this.messages = this.board.messages;
            socketService.setup();
            socketService.emit("board topic", this.board._id);
            socketService.on("update newBoard", this.updateLocalBoard);
        },
        destroyed() {
            socketService.off("update newBoard", this.updateLocalBoard);
            socketService.terminate();
        },
        watch: {
            "$route.params": async function () {
                const boardId = this.$route.params.id;
                const board = await this.$store.dispatch({
                    type: "loadBoard",
                    boardId
                });
                this.board = JSON.parse(JSON.stringify(board));
                socketService.emit("board topic", boardId);
            }
        },
        components: {
            boardNav,
            tasklistList,
            activitylog,
            boardSettings,
            addMember
        }
    };
</script>

<style>
    .msger {
        position: absolute;
        bottom: 50px;
        right: 90px;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        width: 30%;
        max-width: 867px;
        margin: 25px 10px;
        height: 30%;
        border: var(--border);
        border-radius: 5px;
        background: var(--msger-bg);
        box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
    }

    .msger-header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: var(--border);
        background: #eee;
        color: #666;
    }

    .msger-chat {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }

    .msger-chat::-webkit-scrollbar {
        width: 6px;
    }

    .msger-chat::-webkit-scrollbar-track {
        background: #ddd;
    }

    .msger-chat::-webkit-scrollbar-thumb {
        background: #bdbdbd;
    }

    .msg {
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
    }

    .msg:last-of-type {
        margin: 0;
    }

    .msg-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        background: #ddd;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 50%;
    }

    .msg-bubble {
        max-width: 450px;
        padding: 15px;
        border-radius: 15px;
        background: var(--left-msg-bg);
    }

    .msg-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .msg-info-name {
        margin-right: 10px;
        font-weight: bold;
    }

    .msg-info-time {
        font-size: 0.85em;
    }

    .left-msg .msg-bubble {
        border-bottom-left-radius: 0;
    }

    .right-msg {
        flex-direction: row-reverse;
    }

    .right-msg .msg-bubble {
        background: var(--right-msg-bg);
        color: #fff;
        border-bottom-right-radius: 0;
    }

    .right-msg .msg-img {
        margin: 0 0 0 10px;
    }

    #right-smg .msg-img {
        margin: 0 0 0 10px;
    }

    .msger-inputarea {
        display: flex;
        padding: 10px;
        border-top: var(--border);
        background: #eee;
    }

    .msger-inputarea * {
        padding: 10px;
        border: none;
        border-radius: 3px;
        font-size: 1em;
    }

    .msger-input {
        flex: 1;
        background: #ddd;
    }

    .msger-send-btn {
        margin-left: 10px;
        background: rgb(5, 86, 153);
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.23s;
    }

    .msger-send-btn:hover {
        background: rgb(5, 86, 153);
    }

    .msger-chat {
        background-color: #fcfcfe;
    }
</style>