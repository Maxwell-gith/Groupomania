<template>
<div>
    <button class="toComment" @click.prevent="SwitchToComment(), loadComments()">Ajouter un commentaire</button>
    <div v-if="mode == 'comment'" class="comment">
        <form>
            <input class="comment__input" type="text" v-model="content" placeholder="Votre commentaire" />
            <button class="comment__button" @click.prevent="addComment()">Ajouter</button>
            <button class="comment__button" @click.prevent="SwitchToNormalView()">Annuler</button>
        </form>
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
        SwitchToComment() {
            this.mode = 'comment';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
        },
    },
}
</script>

    
