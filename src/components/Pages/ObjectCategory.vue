<template>
  <div class="ObjectCategory">

    <router-link to="/">
      <p>ObjectCategory</p>
    </router-link>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'ObjectCategory',
  props: {
    msg: String
  },
  mounted () {
    d3.json('../../static/cate.json').then(d => {
      d = d.root
      console.log(d)
      var map = []
      for (var i = 0; i < d.length; i++) {
        if (d[i].result) {
          map.push(d[i].result[0].root)
          map.push(d[i].result[1].root)
        }
      }
      map = Array.from(new Set(map))
      console.log(map)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ObjectCategory{
  width: 100%;
  height: 100vh;
}
p {
  text-align: center;
}
</style>
