<template>
  <div class="PreView">
      <div class="main_view">
        <MainPre ref='MainPre'></MainPre>
      </div>
      <div class="timeline">
        <TimeLine 
        @drawBefore='drawBefore'
        @drawAfter='drawAfter'
        @drawAll='drawAll'
        @changeTimes='changeTimes'>
        </TimeLine>
      </div>
  </div>
</template>

<script>
import TimeLine from './TimeLine'
import MainPre from './MainPre'

export default {
  name: 'ThemeColor',
  components:{
    TimeLine,
    MainPre
  },
  methods: {
    changeTimes(times){
      this.$refs.MainPre.changeTimes(times)
    },
    drawBefore() {
      this.$refs.MainPre.drawBefore()
    },
    drawAfter() {
      this.$refs.MainPre.drawAfter()
    },
    drawAll() {
      this.$refs.MainPre.drawAll()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PreView{
    width: 100%;
    height: 100vh;
    padding: 22px;
}
.main_view{
  width: 100%;
  height:70%;
}
.timeline{
  width: 100%;
  height:30%;
}
</style>
