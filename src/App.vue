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
        console.log(response);
        that.$store.dispatch('getOridataAction',response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .post("api/storyDate", {
        p : 1
      })
      .then(function(response) {
        console.log(response.data)
        that.$store.dispatch('getStorydataAction',response.data.res);
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
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
html {
  font-size: calc(100vw / 65);
  font-family: Patriciana;
}

a {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
  color: black;
}

@font-face {
  font-family: 'Patriciana';
  src: url('./assets/Patriciana.otf');
}
</style>
