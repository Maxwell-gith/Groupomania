<template>
  <main>
    <header>
      <nav class="navbar">
          <router-link to="/" title="Accueil"><img  class="navbar__logo" src="./assets/logo-white.svg"/></router-link>
          <ul class="navbar__links">
            <li v-if="log"><router-link to="profile" title="Votre Profil"><i class="far fa-user-circle"></i></router-link></li>
            <li v-if="log"><router-link to="login" title="Se déconnecter"><i type="submit" @click="logout()" class="fas fa-sign-out-alt"></i></router-link></li>
            <li><router-link to="about" title="A propos"><i class="far fa-question-circle"></i></router-link></li>
          </ul>
      </nav>
    </header>    
    
    <section>
      <router-view/>
    </section>

    <footer>
      <p>copyright Groupomania &copy;</p>
    </footer>
  </main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      log: false,
    }
  },

  methods: {
    logOn() {
      if (localStorage.getItem("token")) this.log = true;
      else this.log = false;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("image");
      this.log = false;
    },
  },

  mounted() {
    this.logOn();
  }
};
</script>

<style lang="scss">
@import "@/assets/_shared.scss";



// Reset et fonts
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

// CSS de la page
main{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F7F7FF;
}

.navbar{
    background-color: $primaryColor;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end; 
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

footer{
    background-color: #D12300;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
