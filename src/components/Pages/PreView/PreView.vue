<template>
  <div class="ThemeColor">
      <dir class="main_view">
        <MainPre></MainPre>
      </dir>
      <dir class="timeline">
        <TimeLine></TimeLine>
      </dir>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ThemeColor{
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
