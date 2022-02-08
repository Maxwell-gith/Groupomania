<template>
<div>
    <button class="toAddComment" @click.prevent="SwitchToAddComment()">Ajouter un commentaire</button>
    <div v-if="mode == 'addComment'" class="addComment">
        <form>
            <input class="addComment__input" type="text" v-model="content" placeholder="Votre commentaire" />
            <button class="addComment__button" @click.prevent="addComment()" >Ajouter</button>
            <button class="addComment__button" @click.prevent="SwitchToNormalView()">Annuler</button>
        </form>
    </div>    
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NewComment',
    data() {
        return {
            mode: 'normalView',
            content: '',
        }
    },
    methods: {
        addComment() {
            let token = localStorage.getItem("token");
            const data = {
                comment: this.comment,
                idUser: localStorage.getItem("id"),
            }
            axios
                .post("http://localhost:3000/api/comments/", data
                , {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res);
                    this.$emit("loadComments");
                    this.comment = "";
                    this.SwitchToNormalView();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        SwitchToAddComment() {
            this.mode = 'addComment';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
        },
},
}
</script>

    
