<template>
    <div class="newPostCard">
        <form class="newPostCard__form" v-if="mode == 'addPost'">
            <input class="newPostCard__form__title" type="text" placeholder="Titre (facultatif)" v-model="title">
            <input class="newPostCard__form__text" type="text" placeholder="Votre texte" v-model="title">
            <button class="newPostCard__form__actionButton" @click.prevent="AddPost()">Publier</button>
            <button class="newPostCard__form__actionButton" @click.prevent="SwitchToNormalView()">Annuler</button>
        </form>

        <button class="newPostCard__btnAddPost" @click.prevent="SwitchToAddPost()" v-else>Exprimez-vous!</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NewPost',
    data() {
        return {
            mode: 'normalView',
        }
    },

    methods: {
        SwitchToAddPost() {
            this.mode = 'addPost';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
        },
        AddPost() {
            const data = {
                title: this.title,
                text: this.text,
            }
            axios
                .post("http://localhost:3000/api/posts", data)
                .then((res) => {
                    console.log(res);
                    this.SwitchToNormalView();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.newPostCard{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    border-radius: 10px;
    background-color: $secondaryColor;
    padding-bottom: 15px;
    padding-top: 15px;
    &__form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__title{
            width: 80%;
            height: 40px;
            border-radius: 5px;
            border: none;
            padding: 5px;
            margin-bottom: 25px;
            margin-top: 25px;
            @include shadow;
            background-color: $bodyColor;
        }
        &__text{
            width: 80%;
            height: 80px;
            border-radius: 5px;
            border: none;
            padding: 5px;
            margin-bottom: 25px;
            @include shadow;
            background-color: $bodyColor;
        }
        &__actionButton{
            width: 50%;
            height: 40px;
            padding: 5px;
            margin-bottom: 25px;
            background-color: $tertiaryColor;
            border-radius: 10px;
            color: white;
            @include shadow;
            text-decoration: none;
            border: none;
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

input{
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    @include shadow;
    background-color: $bodyColor;
}

.actionButton{
    width: 50%;
    height: 40px;
    padding: 5px;
    background-color: $tertiaryColor;
    border-radius: 10px;
    color: white;
    @include shadow;
    text-decoration: none;
    border: none;
}

.add-post{
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    @include shadow;
    text-align: start;
    background-color: $bodyColor;
}
</style>




    