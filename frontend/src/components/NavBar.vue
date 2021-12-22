<template>
    <nav class="navbar">
        <img  class="logo" src="../assets/logo-white.svg"/>
    </nav>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .navbar{
      background-color: #D12300;
      height: 100px;
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-top: 35px;
  
  }
  .logo{
      width: 170px;
  }
</style>
