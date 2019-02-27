<template>
  <div class="welcome">
    welcome
  </div>
</template>

<script>
export default {
  name: 'welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome{
  width: 100%;
  height: 400px;
  background: burlywood;
  text-align: center;
}
</style>
