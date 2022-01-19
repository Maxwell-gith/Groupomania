<template>
  <section class="sectionHome">
    <div class="componnents">
      <NewPost />
    </div>
    <div class="componnents">
      <LoadPosts />
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_shared.scss";

.sectionHome{
  display: flex;
  align-items: center;
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

</style>
