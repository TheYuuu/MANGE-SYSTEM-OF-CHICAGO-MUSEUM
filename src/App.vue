<template>
  <div id="app">
    <layout msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import layout from "./components/layout.vue";

export default {
  name: "app",
  components: {
    layout
  },
  mounted() {
    var that = this;
    axios
      .post("api/dateOri", {
        p : 1
      })
      .then(function(response) {
        that.$store.dispatch('getOridataAction',response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: calc(100vw / 65);
}

a {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
  color: black;
}
</style>
