<template>
<section class="sectionLogin">
    <div class="signUpCard">
        <img  class="signUpCard__logo" src="../assets/logo-red.svg"/>
        <h1 v-if="mode == 'login'">Connexion</h1>
        <h1 v-else>Inscription</h1>
        <p class="signUpCard__subtitle" v-if="mode == 'login'">Pas encore inscrit ? <span @click="switchToCreateAccount()">Créer un compte</span></p>
        <p class="signUpCard__subtitle" v-else>Déjà inscrit ? <span @click="switchToLogin()">Se connecter</span></p>
        <form method="post" @submit.prevent="CreateAccount" >
            <input type="text" v-if="mode == 'createAccount'" v-model="name" placeholder="Nom">
            <input type="text" v-if="mode == 'createAccount'" v-model="firstname" placeholder="Prénom">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Mot de passe">
            <input type="password" v-if="mode == 'createAccount'" v-model="confirmPassword" placeholder="Confirmation Mot de passe">
            <button type="submit" v-if="mode == 'login'" @click.prevent="buttonLogin()">Se connecter</button>
            <button type="submit" v-else @click.prevent="buttonCreateAccount()">S'inscrire</button>
        </form>
    </div>
</section>
</template>


<script>
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            name: "",
            firstname: "",
            email: "",
            password: "",
            confirmPassword: "",
            mode: 'login',
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
                    .post("http://localhost:3000/api/auth/signup", data)
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
                .post("http://localhost:3000/api/auth/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data.userId);
                    console.log(res);
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        switchToCreateAccount() {
            this.mode = 'createAccount';
        },
        switchToLogin() {
            this.mode = 'login';
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.sectionLogin{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
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
        margin-bottom: 15px;
        span{
            color: $primaryColor;
            cursor: pointer;
        }
    }
}

input{
    width: 80%;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    margin-bottom: 25px;
    @include shadow;
    background-color: $bodyColor;
}


h1{
    margin-bottom: 15px;
    color: $primaryColor;
}

button{
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
    