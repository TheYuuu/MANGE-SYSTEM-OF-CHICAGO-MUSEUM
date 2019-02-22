<template>
  <div class="ObjectCategory">
    <router-link to="welcome">
      <p>ObjectCategory</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ObjectCategory',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: center;
}
</style>
