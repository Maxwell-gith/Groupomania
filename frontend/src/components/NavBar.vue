<template>
    <nav class="navbar">
        <router-link to="/"><img  class="navbar__logo" src="../assets/logo-white.svg"/></router-link>
        <ul class="navbar__links">
          <li><router-link to="profile"><i class="far fa-user-circle"></i></router-link></li>
          <li><router-link to="about"><i class="far fa-question-circle"></i></router-link></li>
        </ul>
        
        
    </nav>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/_shared.scss";

  .navbar{
      background-color: $primaryColor;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: end; 
      padding: 35px 15px 15px 15px;
      &__logo{
        width: 170px;
        display: inline-block;
      }
      &__links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        li{
          margin-left: 25px;
          i{
            font-size: 25px;
            color: white;
            cursor: pointer;
          }
        }
      }
  }
</style>
