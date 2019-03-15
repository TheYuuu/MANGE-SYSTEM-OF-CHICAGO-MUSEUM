<template>
  <div id="Tags" ref="Tags">
      <svg id="tags_svg" ref="tags_svg"></svg>
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
      var timer = setInterval(() => {
        if (this.$refs.Tags.offsetWidth != 0) {
          clearInterval(timer);
          this.init(data);
          // do ...
        }
      }, 10)
    },
    init(data) {
      const that = this;
      this.svg = d3.select(that.$refs.tags_svg);

      this.width = document.getElementById("Tags").offsetWidth - 44;
      this.height = (document.getElementById("Tags").offsetHeight) - 44;

      this.padding = 22;
      this.interval = 500;

      this.svg.append('text').html(that.arr.name).attr('x',100).attr('y',100)
    },
  },
  mounted () {
    console.log(this.arr)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Tags{
  width: 100%;
  height: 100%;
  background: bisque;
}
#tags_svg{
  width:100%;
  height:100%;
}
</style>
