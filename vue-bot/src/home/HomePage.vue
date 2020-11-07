<template>
  <div class="home">
    <div>
      <img src="../assets/robot-home.png" alt="robot image" class="robot" aria-hidden="true">
    </div>
    <div class="get-started">
      <router-link to="/build">Get started</router-link> building your firts robot:
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  text-align: center;
  .robot {
    height: 300px;
  }
}
</style>
