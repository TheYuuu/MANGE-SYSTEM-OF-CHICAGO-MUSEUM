<template>
  <div class="Tags">
      <svg id="tags_svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Tags',
  props: {
    arr:Object
  },
  methods:{
    addTag(params){
      this.$emit('AddTags', params)
    },    
    Start(){
     var data = this.$store.getters.getOridata;
      console.log(data)
      var timer = setInterval(() => {
        if (document.getElementById("Tags").offsetWidth != 0) {
          // clearInterval(timer);
          // this.init(data.all);
          // this.DrawDescription(data.all);
          // this.DrawAxis(data.all);
          // this.Update(data.all);
          console.log('1')
          this.init(data);
        }
      }, 10)
    },
    init(data) {
      this.svg = d3.select("#tags_svg");
      this.width = document.getElementById("Tags").offsetWidth - 44;
      this.height = (document.getElementById("Tags").offsetHeight) - 44;

      this.padding = 22;
      this.interval = 500;

      svg.append('text').text('12312312')
    },
  },
  mounted () {
    console.log(this.arr)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Tags{
  width: 100%;
  height: 100%;
  background: bisque;
}
.tags_svg{
  width:100%;
  height:100%;
}
</style>
