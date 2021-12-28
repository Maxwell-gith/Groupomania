<template>
  <section class="sectionAbout">
    <figure class="sectionAbout__content">
      <img  class="sectionAbout__content__logo" src="../assets/logo-white.svg"/>
      <figcaption>
        Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
        plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
        300 il y a 3 ans.
      </figcaption>
    </figure>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/_shared.scss";

  .sectionAbout{
    min-height: 100vh;
    background-image: url(../assets/bcg_groupomania.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    &__content{
      background-color: rgba( $tertiaryColor, $alpha: 0.9);
      padding: 35px;
      width: 100%;
      height: 35%;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &__logo{
        margin-bottom: 20px;
        width: 50%;
      }
    }
  }

</style>
