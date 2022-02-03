<template>
    <div class="postCardContainer">
        <div class="postCard" v-for="post in allPosts" :key="post.id">
            <figure class="postCard__profileInfos">
                <div class="postCard__profileInfos__image">
                    <img src="../assets/profilepics.jpg" alt="">
                </div>
                <figcaption class="postCard__profileInfos__text">
                    <strong>{{ post.User.firstname }} {{ post.User.name }}</strong> 
                    <em>01/01/2022</em>
                </figcaption>
                <i type="submit" @click.prevent="switchToUpdate(post.id);title=post.title;content=post.content" class="fas fa-pen"></i>
                <i type="submit" @click.prevent="deletePost(post.id)" class="fas fa-trash-alt"></i>
            </figure>
            <div v-if="UpdateId == post.id" class="postCard__content">                                
                <input class="postCard__content__input" v-model="title">
                <input class="postCard__content__input" v-model="content">
                <div class="postCard__content__buttonContainer">
                    <button class="postCard__content__buttonContainer__button" @click.prevent="UpdatePost(post.id)">Publier</button>
                    <button class="postCard__content__buttonContainer__button" @click="UpdateId=-1">Annuler</button>                     
                </div>                    
            </div>
            <div v-else class="postCard__content">
                <strong class="postCard__content__title">{{ post.title }}</strong>
                <p class="postCard__content__text">{{ post.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'loadPosts',
    data() {
        return {
            token: "",
            userId: localStorage.getItem("id"),
            isAdmin: "",
            allPosts: [],
            idUsers: "",
            title: "",
            content: "",
            createdAt: "",
            UpdateId:-1,
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

       async UpdatePost(idPost) {
            let token = localStorage.getItem("token");
            //let userId = localStorage.getItem("id");
            const data = {
                title: this.title,
                content: this.content,                
            }
            await axios
                .put("http://localhost:3000/api/posts/" + idPost, data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.load();
                    this.title = "";
                    this.content = "";
                    this. UpdateId=-1;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        switchToUpdate(Id) {
            this.UpdateId = Id;
        }
    },
    mounted() {
        this.load();
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
    &__profileInfos{
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 15px;
        padding : 15px;
        border-bottom: $secondaryColor 2px solid;
        border-radius: 10px;
        &__image{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: $primaryColor 3px solid;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__text{
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            em{
                font-size: 11px;
            }
        }
        i{
          font-size: 15px;
          color: $tertiaryColor;
          cursor: pointer;
        }
    }
    &__content{
        width: 100%;
        padding : 15px;
        align-items: flex-start;
        &__title{
            margin-bottom: 15px;
        }
        &__input{
            width: 100%;
            height: 40px;
            border-radius: 5px;
            border: none;
            padding: 5px;
            margin-bottom: 25px;
            @include shadow;
            background-color: $bodyColor;
        }
        &__buttonContainer {
            display: flex;
            justify-content: space-around;
            flex-direction: row;
            &__button{
                width: 40%;
                height: 40px;
                padding: 5px;
                background-color: $tertiaryColor;
                border-radius: 10px;
                color: white;
                @include shadow;
                text-decoration: none;
                border: none;
            }
        }  
    }
}
</style>