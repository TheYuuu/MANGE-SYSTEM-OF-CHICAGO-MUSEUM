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
}
html {
  font-size: calc(100vw / 65);
  font-family: Patriciana;
}
svg{
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
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

::-webkit-scrollbar {  /* 滚动条整体部分 */
          width:10px;
          margin-right:2px
      }
::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
    width:10px;
    background-color: none;
}
::-webkit-scrollbar:horizontal {
    height:10px;
    margin-bottom:2px
}
::-webkit-scrollbar-track {  /* 外层轨道 */
    border-radius: 10px;
}
::-webkit-scrollbar-track-piece {  /*内层轨道，滚动条中间部分 */
    background-color: rgb(105, 60, 60);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {  /* 滑块 */
    width:10px;
    border-radius: 5px;
    background: #333333;
}
::-webkit-scrollbar-corner { /* 边角 */
    width: 10px;
    background-color: none;
}
::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
    background: #909090;
}
</style>
