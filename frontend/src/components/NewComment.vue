<template>
<div>
    <button v-if="mode == 'normalView'" class="toCommentButton" @click.prevent="SwitchToComment(), loadComments()">Commentaire(s)</button>
    <button v-else class="toCommentButton" @click.prevent="SwitchToNormalView()">Commentaire(s)</button>
    <form class="sendComment">
        <input class="sendComment__input" type="text" v-model="content" placeholder="Votre commentaire" />
        <div class="sendComment__button" @click.prevent="addComment()"><i class="sendComment__button__icon fas fa-paper-plane"></i></div>
    </form>
    <div v-if="mode == 'comment'" class="comment">
        <div class="comment__view" v-for="comment in allComments" :key="comment.id">
            <div class="comment__view__card">
                <figure>
                    <img class="comment__view__card__img" src="../assets/profilepics.jpg" alt="" />
                </figure>
                <figcaption>
                    <strong>{{ comment.User.firstname }} {{ comment.User.name }}</strong>
                    <em>{{ comment.createdAt }}</em>
                    <p>{{ comment.content }}</p>
                </figcaption>
            </div>
        </div>
    </div>    
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NewComment',
    data() {
        return {
            mode: 'normalView',
            content: '',
            allComments: [],
        }
    },
    props: {
        idPost: Number,
    },
    methods: {
        addComment() {
            let token = localStorage.getItem("token");
            const data = {
                content: this.content,
                idUser: localStorage.getItem("id"),
                idPost: this.idPost,
            }
            axios
                .post("http://localhost:3000/api/comments/", data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.loadComments();
                    this.content = "";
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        loadComments() {
            let token = localStorage.getItem("token");
            axios
                .get("http://localhost:3000/api/comments/" + this.idPost, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    this.allComments = res.data;
                    console.log(this.allComments);
                })
                .catch((error) => {
                    console.log(error);

                });
        },
        countComments() {
            let token = localStorage.getItem("token");
            axios
                .get("http://localhost:3000/api/comments/" + this.idPost, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    this.allComments = res.data;
                    console.log(this.allComments);
                })
                .catch((error) => {
                    console.log(error);

                });
        },
        SwitchToComment() {
            this.mode = 'comment';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";
    .sendComment {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 20px 0 20px 0;
        &__input {
            width: 70%;
            height: 40px;
            border-radius: 5px;
            border: none;
            padding: 5px;
            @include shadow;
            text-align: start;
            background-color: $bodyColor;
            &:focus {
                outline: none;
            }
        }
        &__button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            padding: 5px;
            @include shadow;
            background-color: $tertiaryColor;
            color: $bodyColor;
            display: flex;
            justify-content: center;
            align-items: center;
            &:focus {
                outline: none;
            }
            &__icon {
                color: $bodyColor;
            }
        }
    }

</style>
    
