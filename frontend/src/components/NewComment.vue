<template>
<div>
    <form class="sendComment">
        <div class="sendComment__image">
            <img class="comment__view__card__img" src="../assets/profilepics.jpg" alt="" />
        </div>
        <input class="sendComment__input  styleInput" type="text" v-model="content" placeholder="Votre commentaire" />
        <div class="sendComment__button" @click.prevent="addComment()"><i class="sendComment__button__icon fas fa-paper-plane"></i></div>
    </form>
    <button v-if="mode == 'normalView'" class="toCommentButton primaryButton" @click.prevent="SwitchToComment(), loadComments()">Voir les commentaire(s)</button>
    <button v-else class="toCommentButton primaryButton" @click.prevent="SwitchToNormalView()">Masquer les commentaire(s)</button>
    <div v-if="mode == 'comment'">
        <div class="commentContainer" v-for="comment in allComments" :key="comment.id">
            <div class="comment">
                <figure class="comment__infos">
                    <div class="comment__infos__image">
                        <img src="../assets/profilepics.jpg" alt="" />
                    </div>
                    <figcaption class="comment__infos__text">
                        <strong>{{ comment.User.firstname }} {{ comment.User.name }}</strong>
                        <em>{{ comment.createdAt }}</em>
                    </figcaption>
                    <i v-if="userId == comment.idUser" type="submit" @click.prevent="switchToUpdate(comment.id);content=comment.content" class="fas fa-pen"></i>
                    <i v-if="isAdmin === true || userId == comment.idUser" type="submit" @click.prevent="deleteComment(comment.id)" class="fas fa-trash-alt"></i>
                </figure>
                <div v-if="UpdateId == comment.id" class="comment__modify">
                    <input class="comment__modify__input styleInput" v-model="content" />
                    <div v-if="UpdateId == comment.id" class="comment__modify__button" @click.prevent="addComment()"><i class="sendComment__button__icon fas fa-paper-plane"></i></div>
                </div>
                <button v-if="UpdateId == comment.id" class="stopModifyButton secondaryButton" @click="UpdateId=-1">Annuler</button>
                <p v-else class="comment__content">{{ comment.content }}</p>
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
            UpdateId:-1,
            userId: localStorage.getItem("id"),
            isAdmin: "",
        }
    },
    props: {
        idPost: Number,
        idUser: Number,
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
                    this.SwitchToComment();
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
        deleteComment(id) {
            let token = localStorage.getItem("token");
            axios
                .delete("http://localhost:3000/api/comments/" + id, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.loadComments();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateComment(idComment) {
            let token = localStorage.getItem("token");
            const data = {
                content: this.content,
            }
            axios
                .put("http://localhost:3000/api/comments/" + idComment, data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.loadComments();
                    this.content = "";
                    this.UpdateId = -1;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        SwitchToComment() {
            this.mode = 'comment';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
            this.content = "";
        },
        switchToUpdate(Id) {
            this.UpdateId = Id;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";
    .toCommentButton {
        height: 40px;
        width: 50%;
        margin-bottom: 25px;
    }
    .sendComment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 15px;
        &__image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: $primaryColor 3px solid;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__input {
            width: 80%;
            height: 40px;
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
div{
    width: 100%;
}
.commentContainer{
    padding: 15px;
}
.comment{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: $bodyColor 2px solid;
    border-radius: 10px;
    margin-bottom: 15px;
    @include shadow;
    background-color: $bodyColor;
    &__infos {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 10px;
        padding: 15px;
        border-bottom: $secondaryColor 2px solid;
        border-radius: 10px;
        &__image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: $primaryColor 3px solid;
            overflow: hidden;
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__text {
            width: 80%;
            display: flex;
            flex-direction: column;
            em{
                font-size: 11px;
            }
        }
    }
    &__modify{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        &__input{
            width: 80%;
            height: 40px;
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
    .stopModifyButton{
        margin-bottom: 25px;
        height: 40px;
        width: 50%;
    }
    &__content {
        width: 100%;
        padding: 15px;
        text-align: justify;
        word-wrap: break-word;
    }

}

</style>
    
