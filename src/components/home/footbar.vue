<template>
    <div class="footbar">
    <audio
      autoplay="autoplay"
      controls="controls"
      loop="loop"
      src="../../../static/media/bgm.mp3">
    </audio>
    <a href="http://www.shuaibiyu.cn">ShuaiBiYu Studying</a>
    </div>
</template>

<script>

export default {
  name: 'footbar',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footbar {
  width: 100%;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
}
.footbar a {
  width: 100%;
  display: inline-block;
  text-align: center;
  color: #99a2aa;
  font: 12px Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
}

audio{
  position: absolute;
  float: left;
  vertical-align: middle;
  width: 20%;
  height: 22px;
}
</style>
