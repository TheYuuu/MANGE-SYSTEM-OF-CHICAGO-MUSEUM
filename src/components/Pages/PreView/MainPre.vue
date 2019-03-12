<template>
  <div id="MainPre">
    <svg id="MainPre_svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'MainPre',
  methods:{
    init(data) {
      var place = [];
      for (var i = 0; i < data.length; i++) {
        place.push(data[i].place)
      }
      place = Array.from(new Set(place))
      
      this.svg = d3.select("#MainPre_svg");
      this.width = document.getElementById("MainPre").offsetWidth - 44;
      this.height = document.getElementById("MainPre").offsetHeight - 44;

      this.padding = 20;
      this.interval = 1000;
      this.y = d3
        .scaleTime()
        .range([this.height - this.padding - this.padding, 0]);

      this.x = d3.scaleBand().range([0, (this.width - this.padding - this.padding)]);

      this.y.domain([new Date(data[0].s), new Date(data[data.length - 1].e)]);
      this.x.domain(place);

      this.yAxis = d3.axisRight(this.y);
      this.xAxis = d3.axisBottom(this.x);
    },
    drawAxis(data) {
      const svg = this.svg;
      const height = this.height;
      const padding = this.padding;
      const xAxis = this.xAxis;
      const yAxis = this.yAxis;

      svg
        .append("g")
        .attr("class", "axis main_y_axis")
        .attr("transform", "translate(" + padding + "," + padding + ")")
        .attr("fill", "black")
        .call(yAxis);

      svg
        .append("g")
        .attr("class", "axis x_axis")
        .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
        .attr("fill", "black")
        .call(xAxis);
    },
    drawLine(data) {
      const svg = this.svg;
      const height = this.height;
      const padding = this.padding;
      const x = this.x;
      const y1 = this.y1;
    },
  },
  mounted(){
    var data = this.$store.getters.getStorydata;
    this.data = data;
    var that = this;
    var timer = setInterval(() => {
      if (document.getElementById("MainPre").offsetWidth != 0) {
        clearInterval(timer);
        that.init(data);
        that.drawAxis(data);
        that.drawLine(data);
      }
    }, 10);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#MainPre{
    width: 100%;
    height: 100%;
    padding: 22px;
}
#MainPre_svg{
    width: 100%;
    height: 100%;
}
</style>
