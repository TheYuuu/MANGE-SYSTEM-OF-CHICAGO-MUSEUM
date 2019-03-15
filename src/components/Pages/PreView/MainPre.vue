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
      
      this.svg = d3.select("#MainPre_svg");
      this.width = document.getElementById("MainPre").offsetWidth - 44;
      this.height = document.getElementById("MainPre").offsetHeight - 44;

      this.padding = 20;
      this.interval = 1000;
      this.y = d3
        .scaleLinear() 
        .range([this.height - this.padding - this.padding, 0]);

      this.x = d3.scaleBand().range([0, (this.width - this.padding - this.padding)])

      this.y.domain([0,d3.max(data.allcountrys,function(d){
          return d.works.length;
      })]);
      this.x.domain(data.allcountrys.map(v=>v.name));

      this.axisstep = this.x.step()
      this.rectWidth =  (this.width - this.axisstep * 2) / 20 -10;
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
    drawRect(data) {
      const svg = this.svg;
      const height = this.height;
      const padding = this.padding;
      const x = this.x;
      const y = this.y;
      const axisstep = this.axisstep
      const rectWidth = this.rectWidth

      for (let i=0;i<data.allcountrys.length;i++){
        svg.append('g')
        .selectAll('rect')
        .data(data.allcountrys[i].color)
        .enter()
        .append('rect')
        .attr('class','bgc')
        .attr('fill', function(d){
            return 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')';
        })
        .attr('width',rectWidth)
        .attr('height', function(d){
          return height - padding*2;
        })
        .attr('x',function(d){
          return x(data.allcountrys[i].name) + axisstep/2 - padding;
        })
        .attr('y', function(d,i){
          return y(data.allcountrys[i].works.length) + padding
        })
      }
    }
  },
  mounted(){
    var data = this.$store.getters.getOridata;
    this.data = data;
    console.log(data)
    var that = this;
    var timer = setInterval(() => {
      if (document.getElementById("MainPre").offsetWidth != 0) {
        clearInterval(timer);
        that.init(data.all);
        that.drawAxis(data.all);
        that.drawRect(data.all);
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
