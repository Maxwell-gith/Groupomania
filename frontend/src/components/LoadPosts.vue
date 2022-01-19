<template>
    <div class="postCard">
        <figure class="postCard__profileInfos">
                <img class="postCard__profileInfos__image" src="D:\Desktop\Groupomania v2.0\frontend\src\assets\profilePic .jpg" alt="">
            <figcaption class="postCard__profileInfos__name">
                <h2>Michel Robert</h2>
                <p>01/01/22</p>
            </figcaption>
        </figure>
        <div class="postCard__content">
            <h2 class="postCard__title">Un bel article</h2>
            <p class="postCard__text">le texte </p>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.postCard{
    background-color: $secondaryColor;
    width: 90%;
    border-radius: 10px;
    margin-bottom: 25px;
    &__profileInfos{
        display: flex;
        justify-content: space-between;
        &__image{
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }
    }
}
</style>