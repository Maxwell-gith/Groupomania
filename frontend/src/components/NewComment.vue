<template>
<div>
    <form class="sendComment">
        <div class="sendComment__image">
            <img class="comment__view__card__img" src="../assets/profilepics.jpg" alt="" />
        </div>
        <input class="sendComment__input  styleInput" type="text" v-model="content" placeholder="Votre commentaire" />
        <div class="sendComment__button" @click.prevent="addComment()"><i class="sendComment__button__icon fas fa-paper-plane"></i></div>
        <label class="sendComment__button" for="fileInputComment" title="Ajouter une image"><i class="fas fa-file-image"></i></label>
        <input class= "sendComment__addFileInput" id="fileInputComment" type="file" @change="addImg()" ref="file" />
    </form>
    <button v-if="mode == 'normalView'" class="toCommentButton primaryButton" @click.prevent="SwitchToComment(), loadComments()">Voir les commentaire(s)</button>
    <button v-else class="toCommentButton primaryButton" @click.prevent="SwitchToNormalView()">Masquer les commentaire(s)</button>
    <div v-if="mode == 'comment'">
        <div class="commentContainer" v-for="comment in allComments" :key="comment.id">
            <div class="comment">
                <div class="comment__profile">
                    <div class="comment__profile__infos">
                        <div class="comment__profile__infos__image">
                            <img src="../assets/profilepics.jpg" alt="" />
                        </div>
                        <div class="comment__profile__infos__text">
                            <strong>{{ comment.User.firstname }} {{ comment.User.name }}</strong>
                            <em>{{ comment.createdAt }}</em>
                        </div>
                    </div>
                    <div class="comment__profile__tools">
                        <span v-if="userId == comment.idUser"><i type="submit" @click.prevent="switchToUpdate(comment.id);content=comment.content" class="fas fa-pen"></i></span>
                        <span v-if="isAdmin === true || userId == comment.idUser"><i type="submit" @click.prevent="deleteComment(comment.id)" class="fas fa-trash-alt"></i></span>
                    </div>
                </div>
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
            errorAlert: "",
            file: null,
        }
    },
    props: {
        idPost: Number,
        iduser: Number,
    },
    methods: {
        addComment() {
            let token = localStorage.getItem("token");
            let data = new FormData();
            if (this.file !== null && document.getElementById("fileInputComment").value !='') {
                data.append('image', this.file, this.file.name);
                data.append('content', this.content);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            else {
                data.append('content', this.content);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            axios
                .post("http://localhost:3000/api/comments/", data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    document.getElementById("fileInput").value='';
                    console.log(res);
                    this.loadComments();
                    this.SwitchToComment();
                    this.content = "";
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert = error.response.data.error);
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
                    alert(this.errorAlert = error.response.data.error);
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
                    alert(this.errorAlert = error.response.data.error);
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
        },
        adminOrNot() {
            let token = localStorage.getItem("token");
            axios
                .get("http://localhost:3000/api/profile/" + this.userId, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    this.isAdmin = res.data.isAdmin;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.adminOrNot();
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
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__input {
            width: 70%;
            height: 40px;
        }
        &__button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            padding: 5px;
            margin-left: 10px;
            @include shadow;
            background-color: $tertiaryColor;
            color: $bodyColor;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:focus {
                outline: none;
            }
            &__icon {
                color: $bodyColor;
            }
        }
        &__addFileInput {
            display: none;
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
    &__profile {
        display: flex;
        width: 100%;
        margin-bottom: 15px;
        padding: 15px;
        border-bottom: $secondaryColor 2px solid;
        border-radius: 10px;
        &__infos {
            display: flex;
            align-items: center;
            width: 70%;
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
                width: 50%;
                display: flex;
                flex-direction: column;
                em{
                    font-size: 11px;
                }
            }
        }
        &__tools {
            display: flex;
            width: 39%;
            justify-content: flex-end;
            align-items: center;
            span{
                width: 30px;
                height: 30px;
                background-color: $tertiaryColor;
                margin-left: 15px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                i{
                    font-size: 11px;
                    color: $bodyColor;
                }
            }
            span:hover {
                background-color: $primaryColor;
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
    
