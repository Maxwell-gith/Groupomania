<template>
  <main>
    <header>
      <NavBar/>
    </header>    
    
    <router-view/>

    <footer>
      <p>copyright Groupomania &copy;</p>
    </footer>
  </main>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

main{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

footer{
    background-color: #D12300;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
}
</style>
