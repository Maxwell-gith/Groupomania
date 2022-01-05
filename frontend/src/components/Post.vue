<template>
    <div class="postCard">
        <header class="postCard__profileInfos">
            <div class="postCard__profileInfos__image">
                <img src="../assets/logo-white.svg" alt="">
            </div>
            <div class="postCard__profileInfos__name">
                <h2>Michel Robert</h2>
                <p>01/01/22</p>
            </div>
        </header>
        <div class="postCard__content">
            <h2 class="postCard__title">Un bel article</h2>
            <p class="postCard__text">le texte </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post',

}
</script>