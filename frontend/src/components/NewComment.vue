<template>
<div>
    <form class="sendComment">
        <div v-if="imageUser" class="sendComment__image">
            <img class="comment__view__card__img" :src="imageUser" alt="" />
        </div>
        <div v-else class="sendComment__image">
            <img class="comment__view__card__img" src="../assets/profilepics.jpg" alt="" />
        </div>
        <input class="sendComment__input  styleInput" type="text" v-model="content" placeholder="Votre commentaire" />
        <label class="sendComment__button" for="fileInputComment" title="Ajouter une image"><i class="fas fa-file-image"></i></label>
        <div class="sendComment__button" @click.prevent="addComment()" title="Envoyer commentaire"><i class="sendComment__button__icon fas fa-paper-plane"></i></div>
    </form>
    <em v-if="this.$parent.urlImageComment">Votre nouvelle image: {{ this.$parent.urlImageComment }}</em>
    <button v-if="mode == 'normalView' && allComments.length > 0" class="toCommentButton" @click.prevent="SwitchToComment(), loadComments()">Voir le(s) Commentaire(s)</button>
    <button v-if="mode == 'comment' && allComments.length > 0" class="toCommentButton" @click.prevent="SwitchToNormalView()">Masquer le(s) Commentaire(s)</button>
    <div v-if="mode == 'comment'">
        <div class="commentContainer" v-for="comment in allComments" :key="comment.id">
            <div class="comment">
                <div class="comment__profile">
                    <div class="comment__profile__infos">
                        <div v-if="comment.User.image" class="comment__profile__infos__image">
                            <img :src="comment.User.image" alt="" />
                        </div>
                        <div v-else class="comment__profile__infos__image">
                            <img src="../assets/profilepics.jpg" alt="" />
                        </div>
                        <div class="comment__profile__infos__text">
                            <strong>{{ comment.User.firstname }} {{ comment.User.name }}</strong>
                            <em>{{ comment.createdAt }}</em>
                        </div>
                    </div>
                    <div class="comment__profile__tools">
                        <span v-if="userId == comment.idUser" type="submit" @click.prevent="switchToUpdate(comment.id);content=comment.content" title="Modifier commentaire"><i class="fas fa-pen"></i></span>
                        <span v-if="isAdmin === true || userId == comment.idUser" type="submit" @click.prevent="confirmDelete(comment.id)" title="Supprimer commentaire"><i class="fas fa-trash-alt"></i></span>
                    </div>
                </div>
                <div v-if="UpdateId == comment.id" class="comment__modify">
                    <input class="comment__modify__input styleInput" v-model="content" />
                    <div v-if="file == null" class="comment__modify__image">
                        <img :src="comment.image" alt="">
                    </div>
                    <div class="comment__modify__button1">
                        <label for="fileInputComment" class="primaryButton">Ajouter une image</label>
                        <em v-if="this.$parent.urlImageComment">Votre nouvelle image: {{ this.$parent.urlImageComment }}</em>
                    </div>
                    <div class="comment__modify__button2">
                        <button class="primaryButton" @click.prevent="updateComment()">Modifier</button>
                        <button class="secondaryButton"  @click="UpdateId=-1, loadComments()">Annuler</button>
                    </div>
                </div>
                <div v-else>
                    <p class="comment__content">{{ comment.content }}</p>
                    <div v-if="comment.image != 'no image'" class="comment__content__image">
                        <img :src="comment.image" alt="">
                    </div>
                </div>
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
            imageUser: localStorage.getItem("image"),
            isAdmin: "",
            errorAlert: "",
            dataUser: [],
        }
    },
    props: {
        idPost: Number,
        iduser: Number,
        image: String,
    },
    methods: {
        addComment() {
            let token = localStorage.getItem("token");
            let data = new FormData();
            if (this.$parent.file !== null && document.getElementById("fileInputComment").value !='') {
                data.append('content', this.content);
                data.append('image', this.$parent.file, this.$parent.file.name);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            else {
                data.append('content', this.content);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            axios
                .post("http://localhost:3000/api/comments/" , data, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then(() => {
                    document.getElementById("fileInput").value='';
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
                    document.getElementById("fileInputComment").value='';
                    this.file = null;
                    this.$parent.urlImageComment = "";
                    this.content = "";
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
        confirmDelete(id) {
            if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
                this.deleteComment(id);
            }
        },
        updateComment() {
            let token = localStorage.getItem("token");
            let data = new FormData();
            if (this.$parent.file !== null && document.getElementById("fileInputComment").value !='') {
                data.append('content', this.content);
                data.append('image', this.$parent.file, this.$parent.file.name);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            else {
                data.append('content', this.content);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            }
            axios
                .put("http://localhost:3000/api/comments/" + this.UpdateId, data
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
        this.loadComments();
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";
    .toCommentButton {
        height: 60px;
        width: 100%;
        padding: 5px;
        background-color: transparent;
        text-decoration: none;
        border: none;
        border-top: $secondaryColor 2px solid;
        font-weight: 700;
        font-size: 1em;
        cursor: pointer;
    }
    .sendComment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 15px;
        &__image {
            max-width: 40px;
            max-height: 40px;
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
            min-width: 40px;
            min-height: 40px;
            max-width: 40px;
            max-height: 40px;
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
    display: flex;
    justify-content: center;
    align-items: center;
}
.comment{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
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
        width: 100%;
        padding: 15px;
        &__input{
            width: 100%;
            height: 40px;
        }
        &__image{
            width: 90%;
            height: auto;
            margin: auto;
            margin-bottom: 15px;
            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
        &__button1{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            label{
                width: 40%;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px;
            }
            em{
                color: $tertiaryColor;
                font-size: 11px;
                font-weight: 700;
                margin-bottom: 15px;
            } 
        }
        &__button2{
            width: 100%;
            display: flex;
            justify-content: space-around;
            button{
                width: 40%;
                height: 40px;
                margin-bottom: 25px; 
            }
        }
    }
    &__content {
        width: 100%;
        padding: 15px;
        text-align: justify;
        word-wrap: break-word;
        &__image{
            width: 90%;
            height: auto;
            margin: auto;
            margin-bottom: 15px;
            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }

        }
    }

}


</style>
    
