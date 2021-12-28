<template>
    <section class="sectionProfile">
        <div class="sectionProfile__card">
            <h1>Mon profil</h1>
            <p>
                <u>Nom</u>: {{ dataUser.name }}
            </p>
            <p>
                <u>Prénom</u>: {{ dataUser.firstname }}
            </p>
            <p>
                <u>Email</u>: {{ dataUser.email }}
            </p>
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
        };
    },
    methods: {
        getData() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .get("http://localhost:3000/api/auth/profile" + userId, {
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

    .sectionProfile{
        min-height: 100vh;
    }
</style>