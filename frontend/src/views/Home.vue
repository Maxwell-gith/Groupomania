<template>
  <section class="sectionHome">
    <div class="componnents">
      <NewPost @loadPosts="loadPosts"/>
    </div>
    <div class="componnents">
      <LoadPosts ref="load"/>
    </div>
  </section>
</template>

<script>
import NewPost from '../components/NewPost.vue';
import LoadPosts from '../components/LoadPosts.vue';

export default {
  name: 'Home',
  components: {
    NewPost,
    LoadPosts,
  },
  data () {
    return {
      token: "",
      allPosts: [],
      mode: 'home',
    }
  },
  methods: {
    loadPosts() {
      this.$refs.load.load();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.sectionHome{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
  max-width: 100%;
}

.componnents {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 750px) {
  .componnents{
      width: 65%;
  }
}

@media only screen and (min-width: 1024px) {
    .componnents{
        width: 40%;
    }
}

</style>
