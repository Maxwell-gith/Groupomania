<template>
    <div>
        <div class="postCard" v-for="post in allPosts" :key="post.id">
            <figure class="postCard__profileInfos">
                <div class="postCard__profileInfos__image">
                    <img src="D:\Desktop\Groupomania v2.0\frontend\src\assets\profilePic .jpg" alt="">
                </div>
                <figcaption class="postCard__profileInfos__text">
                    <strong>{{ post.User.name }} {{ post.User.firstname }}</strong>
                    <p>01/01/2022</p>
                </figcaption>
            </figure>
            <div class="postCard__content">
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
            border: $primaryColor 2px solid;
            img{
                width: 100%;
                height: 100%;
            }
        }
        &__text{
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    &__content{
        width: 100%;
        padding : 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &__title{
            margin-bottom: 15px;
        }
        
    }
}
</style>