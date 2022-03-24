<template>
    <div class="postCardContainer">
        <input v-show="false" id="fileInput" type="file" @change="addImg()" ref="file" />
        <input v-show="false" id="fileInputComment" type="file" @change="addImgComment()" ref="file" />
        <div class="postCard" v-for="post in allPosts" :key="post.id">
            <div class="postCard__profile">
                <div class="postCard__profile__infos">
                    <div v-if="post.User.image" class="postCard__profile__infos__image">
                        <img :src="post.User.image" alt="Photo de profil">
                    </div>
                    <div v-else class="postCard__profile__infos__image">
                        <img src="../assets/profilepics.jpg" alt="Photo de profil">
                    </div>
                    <div class="postCard__profile__infos__text">
                        <strong>{{ post.User.firstname }} {{ post.User.name }}</strong> 
                        <em>{{post.createdAt}}</em>
                    </div>
                </div>
                <div class="postCard__profile__tools">
                    <span v-if="userId == post.idUser" type="submit" @click.prevent="switchToUpdate(post.id);title=post.title;content=post.content" title="Modifier post"><i class="fas fa-pen"></i></span>
                    <span v-if="isAdmin === true || userId == post.idUser" type="submit" @click.prevent="confirmDelete(post.id)" title="Supprimer post"><i class="fas fa-trash-alt"></i></span>
                </div>
            </div>
            <div v-if="UpdateId == post.id" class="postCard__content">                                
                <input class="postCard__content__input styleInput" v-model="title">
                <textarea class="postCard__content__inputText styleInput" v-model="content"></textarea>
                <div v-if="file == null" class="postCard__content__image">
                    <img :src="post.image" alt="">
                </div>
                <div class="postCard__content__button">
                    <label for="fileInput" class="primaryButton">Ajouter une image</label>
                    <em v-if="urlImage">Votre nouvelle image: {{ this.urlImage }}</em>
                </div>
                <div class="postCard__content__buttonContainer">
                    <button class="postCard__content__buttonContainer__button primaryButton" @click.prevent="UpdatePost(post.id)">Modifier</button>
                    <button class="postCard__content__buttonContainer__button secondaryButton" @click="UpdateId=-1, load()">Annuler</button>                     
                </div>                    
            </div>
            <div v-else class="postCard__content">
                <strong class="postCard__content__title">{{ post.title }}</strong>
                <p class="postCard__content__text" style="word-wrap: break-word;">{{ post.content }}</p>
                <div class="postCard__content__image">
                    <img :src="post.image" alt="">
                </div>
            </div>
            <NewComment :idPost="post.id" @adminOrNot="adminOrNot"/>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import NewComment from './NewComment.vue';

export default {
    components: { NewComment },
    name: 'loadPosts',
    data() {
        return {
            token: "",
            userId: localStorage.getItem("id"),
            isAdmin: "",
            allPosts: [],
            dataUser: [],
            idUsers: "",
            title: "",
            content: "",
            createdAt: "",
            UpdateId:-1,
            file: "",
            urlImage: "",
            urlImageComment: "",
        };
    },
    methods: {
        load() {
            let token = localStorage.getItem("token");
            axios
                .get("http://localhost:3000/api/posts/", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    this.allPosts = res.data;
                    document.getElementById("fileInput").value='';
                    this.file = null;
                    this.urlImage = "";
                })
                .catch((error) => {
                    console.log({ error });
                });
        },
        deletePost(id) {
            let token = localStorage.getItem("token");
            axios
                .delete(
                    "http://localhost:3000/api/posts/" + id,{
                        headers: { Authorization: "Bearer " + token },
                    }
                )
                .then((res) => {
                    console.log(res);
                    this.load();
                })
                .catch((error) => {
                    console.log(error); 
                });
        },
        confirmDelete(id) {
            if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
                this.deletePost(id);
            }
        },
        UpdatePost(idPost) {
            let token = localStorage.getItem("token");
            let data = new FormData();
            if (this.file !== null && document.getElementById("fileInput").value !='') {
                data.append("title", this.title);
                data.append("content", this.content);
                data.append("image", this.file, this.file.name);
            } else {             
                data.append("title", this.title);
                data.append("content", this.content);
            }

            axios
                .put("http://localhost:3000/api/posts/" + idPost, data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    document.getElementById("fileInput").value='';
                    console.log(res);
                    this.load();
                    this.title = "";
                    this.content = "";
                    this.urlImage = "";
                    this. UpdateId=-1;
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert = error.response.data.error);
                })
        },
        switchToUpdate(Id) {
            this.UpdateId = Id;
        },
        addImg() {
            this.file = this.$refs.file.files[0];
            this.urlImage = document.getElementById("fileInput").value;
        },
        addImgComment() {
            this.file = this.$refs.file.files[0];
            this.urlImageComment = document.getElementById("fileInputComment").value;
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
        this.load();
        this.adminOrNot();
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";
div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.postCard{
    background-color: $secondaryColor;
    width: 90%;
    border-radius: 10px;
    margin-bottom: 25px;
    &__profile{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 15px;
        padding : 15px;
        border-bottom: $secondaryColor 2px solid;
        border-radius: 10px;
        &__infos{
            display: flex;
            flex-direction: row;
            width: 70%;
            &__image{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: $primaryColor 3px solid;
                overflow: hidden;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &__text{
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                em{
                    font-size: 11px;
                }
            }
        }
        &__tools{
            display: flex;
            flex-direction: row;
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
    &__content{
        width: 100%;
        padding : 15px;
        align-items: flex-start;
        border-bottom: $secondaryColor 2px solid;
        &__title{
            width: 100%;
            margin-bottom: 15px;
            text-align: justify;
            word-wrap: break-word;
        }
        &__text{
            width: 100%;
            text-align: justify;
            word-wrap: break-word;
            margin-bottom: 15px;
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
        &__button{
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
        &__input{
            width: 100%;
            height: 40px;
            margin-bottom: 25px;
        }
        &__inputText{
            width: 100%;
            height: 80px;
            text-align: justify;
            word-wrap: break-word;
            margin-bottom: 25px;
        }
        &__buttonContainer {
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-direction: row;
            &__button{
                width: 40%;
                height: 40px;
                margin-bottom: 25px;
            }
        }  
    }
}
</style>