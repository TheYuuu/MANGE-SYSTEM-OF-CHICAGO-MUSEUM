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
    // axios
    //   .post("api/fenci", {
    //     content: "content i am a boy i i"
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });


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
</style>
