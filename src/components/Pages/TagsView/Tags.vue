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
          this.drawCircle()
          // do ...
        }
      }, 10)
    },
    init(data) {
      const that = this;
      this.svg = d3.select(that.$refs.tags_svg);

      this.width = document.getElementById("Tags").offsetWidth - 44;
      this.height = document.getElementById("Tags").offsetHeight - 44;

      this.padding = 20;
      this.interval = 1000;
    },
    drawCircle() {
      const that = this;
      const width = this.width;
      const height = this.height;

      var nodes = d3.range(100).map(function(d, i) {
        return { name: i, radius: 50 };
      });

      const svg = this.svg;

      drawForce(nodes);

      function drawForce(nodes) {
        console.log(width,height)
        var simulation = d3
          .forceSimulation()
          .force("forceX",d3.forceX().strength(0.1).x(width * 0.5))
          .force("forceY",d3.forceY().strength(0.1).y(height * 0.5))
          .force("center",d3.forceCenter().x(width * 0.5).y(height * 0.5))
          .force("charge", d3.forceManyBody())


        var color = d3.scaleOrdinal(d3.schemeCategory10);

        simulation
          .nodes(nodes)
          .force("collide",d3.forceCollide().strength(0.5)
              .radius(function(d) {
                return d.radius + 10;
              }).iterations(1).strength(0.3)
          )
          .on("tick", ticked);

        var node;
        node = svg
          .append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("fill", 'none')
          .attr('stroke','black')
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          })
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended))
          .attr("r", function(d) {
            return d.radius;
          })
       

        function ticked() {
          node
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            });
        }

        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = null;
          d.fy = null;
        }
      }
    }
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
