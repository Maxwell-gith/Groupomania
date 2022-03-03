<template>
<section class="sectionLogin">
    <div class="signUpCard">
        <img  class="signUpCard__logo" src="../assets/logo-red.svg"/>
        <h1 v-if="mode == 'login'">Connexion</h1>
        <h1 v-else>Inscription</h1>
        <p class="signUpCard__subtitle" v-if="mode == 'login'">Pas encore inscrit ? <span @click="switchToCreateAccount()">Créer un compte</span></p>
        <p class="signUpCard__subtitle" v-else>Déjà inscrit ? <span @click="switchToLogin()">Se connecter</span></p>
        <form method="post" @submit.prevent="CreateAccount" >
            <input class="styleInput" type="text" v-if="mode == 'createAccount'" v-model="name" placeholder="Nom">
            <input class="styleInput" type="text" v-if="mode == 'createAccount'" v-model="firstname" placeholder="Prénom">
            <input class="styleInput" type="email" v-model="email" placeholder="Email">
            <input class="styleInput" type="password" v-model="password" placeholder="Mot de passe"> <br>
            <em v-if="mode == 'createAccount'">Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^*)</em>
            <input class="styleInput" type="password" v-if="mode == 'createAccount'" v-model="confirmPassword" placeholder="Confirmation Mot de passe">
            <button class="primaryButton" type="submit" v-if="mode == 'login'" @click.prevent="buttonLogin()">Se connecter</button>
            <button class="primaryButton" type="submit" v-else @click.prevent="buttonCreateAccount()">S'inscrire</button>
        </form>
    </div>
</section>
</template>


<script>
import axios from "axios";

export default {
    name: 'login',
    data() {
        return {
            name: "",
            firstname: "",
            email: "",
            password: "",
            confirmPassword: "",
            mode: 'login',
            errorAlert: "",
        }
 
    },
    methods: {
        async buttonCreateAccount() {
            if (this.password === this.confirmPassword) {
                const data = {
                    name: this.name,
                    firstname: this.firstname,
                    email: this.email,
                    password: this.password,
                }
                await axios
                    .post("http://localhost:3000/api/user/signup", data)
                    .then((res) => {
                        console.log(res);
                        this.switchToLogin();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                alert("Les mots de passe ne correspondent pas");
            }
        },
        async buttonLogin() {
            await axios
                .post("http://localhost:3000/api/user/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data.userId);
                    console.log(res);
                    this.$root.logOn();
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert = error.response.data.error);
                })
        },
        switchToCreateAccount() {
            this.mode = 'createAccount';
        },
        switchToLogin() {
            this.mode = 'login';
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.sectionLogin{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
}

.signUpCard{
    width: 80%;
    border-radius: 10px;
    background-color: $secondaryColor;
    padding-bottom: 35px;
    padding-top: 35px;
    &__logo{
        width: 96px;
        height: 96px;
        margin-bottom: 15px;
    }
    &__subtitle{
        font-size: 14px;
        font-weight: bold;
        color: #808080;
        margin-bottom: 25px;
        span{
            color: $primaryColor;
            cursor: pointer;
        }
    }
}

input{
    width: 80%;
    height: 40px;
    margin-bottom: 25px;
}

em{
    display: block;
    font-size: 12px;
    color: #808080;
    margin-bottom: 25px;
}

h1{
    margin-bottom: 25px;
    color: $primaryColor;
}

button{
    width: 50%;
    height: 40px;
    margin-bottom: 25px;
}

@media only screen and (min-width: 750px) {
.signUpCard{
    width: 65%;
}

input{
    width: 80%;
}

button{
    width: 30%;
}
}

@media only screen and (min-width: 1024px) {
    .signUpCard{
        width: 40%;
    }
}

</style>
    