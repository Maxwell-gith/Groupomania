<template>
    <div>
        <div class="postCard" v-for="post in allPosts" :key="post.id">
            <figure class="postCard__profileInfos">
                <div class="postCard__profileInfos__image">
                    <img src="../assets/profilepics.jpg" alt="">
                </div>
                <figcaption class="postCard__profileInfos__text">
                    <strong>{{ post.User.firstname }} {{ post.User.name }}</strong>
                    <em>01/01/2022</em>
                </figcaption>
                <i type="submit" @click.prevent="switchToUpdate()" class="fas fa-pen"></i>
                <i type="submit" @click.prevent="deletePost(post.id)" class="fas fa-trash-alt"></i>
            </figure>
            <div v-if="mode == 'update'" class="postCard__content">
                <form method="post" @submit.prevent="updatePost">
                    <input class="postCard__content__title" placeholder= {{ post.title }} v-model="title">
                    <input class="postCard__content__text" placeholder= {{ post.content }} v-model="content">
                    <button class="postCard__content__actionButton" @click.prevent="updatePost(post.id)">Publier</button>
                    <button class="postCard__content__actionButton" @click.prevent="switchToNormalView()">Annuler</button>
                </form>
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
            mode: "normalView", 
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
        switchToUpdate() {
            this.mode = "update";
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
        
    }
}
</style>