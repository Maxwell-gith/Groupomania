<template>
    <section class="sectionProfile">
        <div class="sectionProfile__card">
            <h1 class="sectionProfile__card__title">Mon profil</h1>
            <ul class="sectionProfile__card__content">
                <input type="text" v-if="mode == 'update'" v-model="name" placeholder="Nom"> 
                <li class="sectionProfile__card__content__data" v-else>Nom :{{ dataUser.name }}</li>
                <input type="text" v-if="mode == 'update'" v-model="firstname" placeholder="Prénom">
                <li class="sectionProfile__card__content__data" v-else>Prénom :{{ dataUser.firstname }}</li>
                <input type="email" v-if="mode == 'update'" v-model="email" placeholder="Email"> 
                <li class="sectionProfile__card__content__data" v-else>Email :{{ dataUser.email }}</li> 
            </ul>
            <button class="sectionProfile__card__button" v-if="mode == 'update'" @click="sendUpdate()">Sauvegarder</button>
            <button class="sectionProfile__card__button" v-if="mode == 'update'" @click="switchToRead()">Annuler</button>
            <button class="sectionProfile__card__button" v-else @click="switchToUpdate()">Modifier</button>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: 'profile',
    props: {
        id: Number,
    },
    data() {
        return {
            token: "",
            userId: "",
            dataUser: [],
            name:"",
            firstname:"",
            email:"",
            mode: 'read',
        };
    },
    methods: {
        getData() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .get("http://localhost:3000/api/auth/profile/" + userId, {
                    headers: { Authorization: "Bearer " + token},
                })
                .then((res) => {
                    console.log(res);
                    this.dataUser = res.data;
                })
                .catch((error) => {
                    console.log({ error });
                });
        },
        sendUpdate() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .put("http://localhost:3000/api/auth/profile/" + userId, {
                    name: this.name,
                    firstname: this.firstname,
                    email: this.email,
                }, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.getData();
                    this.switchToRead();
                })
                .catch((error) => {
                    console.log({ error });
                });
        },
        switchToUpdate() {
            this.mode = 'update';
        },
        switchToRead() {
            this.mode = 'read';
        },
    },
    mounted() {
        this.getData();
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

    .sectionProfile{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        margin: 35px 0 35px 0;
        &__card{
            width: 80%;
            height: 100%;
            border-radius: 10px;
            background-color: $secondaryColor;
            padding: 35px 15px 35px 15px;
            &__title{
                color: $primaryColor;
                margin-bottom: 35px;
            }
            &__content{
                list-style: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                &__data{
                    margin-bottom: 15px;
                }
            }
            &__button{
                width: 50%;
                height: 40px;
                padding: 5px;
                background-color: $tertiaryColor;
                border-radius: 10px;
                color: white;
                @include shadow;
                text-decoration: none;
                border: none;
                margin: 15px 15px 15px 15px;
            }
        }
    }

    input{
        width: 90%;
        height: 40px;
        border-radius: 5px;
        border: none;
        padding: 5px;
        margin-bottom: 25px;
        @include shadow;
    }
</style>