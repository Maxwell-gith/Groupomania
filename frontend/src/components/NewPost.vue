<template>
    <div class="newPostCard">
        <form class="newPostCard__form" v-if="mode == 'addPost'">
            <input class="newPostCard__form__title styleInput" type="text" placeholder="Titre (facultatif)" v-model="title">
            <input class="newPostCard__form__text styleInput" type="textarea" cols="60" row="20" placeholder="Votre texte" v-model="content">
            <button class="newPostCard__form__actionButton primaryButton" @click.prevent="AddPost()">Publier</button>
            <button class="newPostCard__form__actionButton secondaryButton" @click.prevent="SwitchToNormalView()">Annuler</button>
        </form>
        <div v-else class="newPostCard__toAddPost">
            <div class="newPostCard__toAddPost__image">
                <img src="../assets/profilepics.jpg" alt="" />
            </div>
            <button class="newPostCard__toAddPost__btnAddPost" @click.prevent="SwitchToAddPost()">Exprimez-vous!</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NewPost',
    data() {
        return {
            mode: 'normalView',
            title: '',
            content: '',
        }
    },

    methods: {
        SwitchToAddPost() {
            this.mode = 'addPost';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
            this.content = '';
        },
        LoadPosts() {
            this.$emit("loadPosts");
            this.title = "";
            this.content = "";
        },
        async AddPost() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            const data = {
                title: this.title,
                content: this.content,
                iduser: userId,
                image: 'no image',
            }
            await axios
                .post("http://localhost:3000/api/posts/", data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.$emit("loadPosts");
                    this.title = "";
                    this.content = "";
                    this.SwitchToNormalView();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.newPostCard{
    width: 90%;
    border-radius: 10px;
    background-color: $secondaryColor;
    padding: 15px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    &__form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__title{
            width: 90%;
            height: 40px;
            margin-bottom: 25px;
        }
        &__text{
            width: 90%;
            height: 80px;
            margin-bottom: 25px;
        }
        &__actionButton{
            width: 50%;
            height: 40px;
            margin-bottom: 25px;
        }
    }
    &__toAddPost{
        display: flex;
        width: 100%;
        justify-content: space-between;
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
        &__btnAddPost{
            width: 90%;
            height: 40px;
            border-radius: 5px;
            border: none;
            padding: 5px;
            @include shadow;
            text-align: start;
            background-color: $bodyColor;
        }
    }

}

</style>




    