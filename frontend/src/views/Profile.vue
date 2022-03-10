<template>
    <section class="sectionProfile">
        <div class="sectionProfile__card">
            <h1 class="sectionProfile__card__title">Mon profil</h1>
            <div v-if="!this.file" class="sectionProfile__card__image">
                <img :src="dataUser.image" alt="Photo de profil">
            </div>
            <div v-else class="sectionProfile__card__image">
                <img src="../assets/profilepics.jpg" alt="Photo de profil">
            </div>
            <ul class="sectionProfile__card__content">
                <label v-if="mode == 'update'" for="fileInput" class="sectionProfile__card__content__actionButton primaryButton">Ajouter une image</label>
                <input v-if="mode == 'update'" class= "sectionProfile__card__content__addFile" id="fileInput" type="file" @change="addImg()" ref="file" />
                <input type="text" v-if="mode == 'update'" v-model="dataUser.name" placeholder="Nom"> 
                <li class="sectionProfile__card__content__data" v-else>Nom : {{ dataUser.name }}</li>
                <input type="text" v-if="mode == 'update'" v-model="dataUser.firstname" placeholder="Prénom">
                <li class="sectionProfile__card__content__data" v-else>Prénom : {{ dataUser.firstname }}</li>
                <input type="email" v-if="mode == 'update'" v-model="dataUser.email" placeholder="Email"> 
                <li class="sectionProfile__card__content__data" v-else>Email : {{ dataUser.email }}</li> 
            </ul>
            <button class="sectionProfile__card__button primaryButton" v-if="mode == 'update'" @click="sendUpdate()">Sauvegarder</button>
            <button class="sectionProfile__card__button secondaryButton" v-if="mode == 'update'" @click="switchToRead(), refresh()">Annuler</button>
            <button class="sectionProfile__card__button primaryButton" v-else @click="switchToUpdate()">Modifier</button>
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
            mode: 'read',
            file: "",
            inputImg: "",
        };
    },
    methods: {
        getData() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .get("http://localhost:3000/api/profile/" + userId, {
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
            let data = new FormData();
            if (this.file !== null && document.getElementById("fileInput").value !='') {
                data.append("name", this.dataUser.name);
                data.append("firstname", this.dataUser.firstname);
                data.append("email", this.dataUser.email);
                data.append("image", this.file, this.file.name);
            } else {             
                data.append("name", this.dataUser.name);
                data.append("firstname", this.dataUser.firstname);
                data.append("email", this.dataUser.email);
            }
            axios
                .put("http://localhost:3000/api/profile/" + userId, data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    document.getElementById("fileInput").value='';
                    console.log(res);
                    this.getData();
                    this.switchToRead();
                })
                .catch((error) => {
                    console.log({ error });
                });
        },
        refresh() {
            this.getData();
            document.getElementById("fileInput").value='';
            this.file = null;
        },
        addImg() {
            this.file = this.$refs.file.files[0];
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
        min-width: 100%;
        display: flex;
        justify-content: center;
        padding: 35px 0 35px 0;
        &__card{
            width: 80%;
            height: 100%;
            border-radius: 10px;
            background-color: $secondaryColor;
            padding: 35px 15px 35px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            &__title{
                color: $primaryColor;
                margin-bottom: 35px;
            }
            &__image{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: $primaryColor 3px solid;
                overflow: hidden;
                margin-bottom: 15px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            &__content{
                list-style: none;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &__data{
                    margin-bottom: 15px;
                }
                &__actionButton{
                    width: 50%;
                    height: 40px;
                    margin-bottom: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                &__addFile{
                    display: none;
                }
            }
            &__button{
                width: 50%;
                height: 40px;
                margin-bottom: 25px;
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

    @media only screen and (min-width: 750px) {
    .sectionProfile__card{
        width: 70%;
        margin-top: 65px;
    }
    }

    @media only screen and (min-width: 1024px) {
    .sectionProfile__card{
        width: 40%;
    }
    }
</style>