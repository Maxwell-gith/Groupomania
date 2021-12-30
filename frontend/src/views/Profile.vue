<template>
    <section class="sectionProfile">
        <div class="sectionProfile__card">
            <h1 class="sectionProfile__card__title">Mon profil</h1>
            <ul class="sectionProfile__card__content">
                <li class="sectionProfile__card__content__data">Nom :{{ dataUser.name }}</li> 
                <li class="sectionProfile__card__content__data">Prénom :{{ dataUser.firstname }}</li> 
                <li class="sectionProfile__card__content__data">Email :{{ dataUser.email }}</li> 
            </ul>
            <button class="sectionProfile__card__button" @click="buttonUpdate()">Modifier</button>
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
            mode: 'update',
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
                align-items: start;
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
            }
        }
    }
</style>