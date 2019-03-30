<template>
  <div id="TagsView">
    <svg id="Tags_svg">
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { setTimeout } from 'timers';
export default {
  name: "TagsView",
  data: function() {
    return {
    };
  },
 methods: {    
    init() {
      this.svg = d3.select("#Tags_svg");
      this.width = document.getElementById("TagsView").offsetWidth - 44;
      this.height = document.getElementById("TagsView").offsetHeight - 44;

      this.padding = 20;
      this.interval = 1000;
    },
    drawCircle() {
      const that = this;
      const width = this.width;
      const height = this.height;

      var nodes = d3.range(10000).map(function(d, i) {
        return { name: i, radius: 2 };
      });

      const svg = this.svg;

      drawForce(nodes);

      function drawForce(nodes) {
        
        var simulation = d3
          .forceSimulation()
          .force("forceX",d3.forceX().strength(0.5).x(width * 0.5))
          .force("forceY",d3.forceY().strength(0.5).y(height * 0.5))
          .force("center",d3.forceCenter().x(width * 0.5).y(height * 0.5))
          .force("charge", d3.forceManyBody())

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        simulation
          .nodes(nodes)
          // .force("collide",d3.forceCollide().strength(0.5)
          //     .radius(function(d) {
          //       if (d.name == -1)
          //         return d.radius + 10;
          //       return d.radius + 5;
          //     }).iterations(1).strength(0.3)
          // )
          .on("tick", ticked);

        setTimeout(()=>{
          console.log(123);
          simulation.stop();
        },3000)

        var node;
        node = svg
          .append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("fill", 'black')
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
              if (d.x - d.radius < 0) {
                d.x += 10;
                return d.x;
              } else if (d.x + d.radius > width) {
                d.x -= 10;
                return d.x;
              }
              return d.x;
            })
            .attr("cy", function(d) {
              if (d.y - d.radius < 0) {
                d.y += 10;
                return d.y;
              } else if (d.y + d.radius > height) {
                d.y -= 10;
                return d.y;
              }
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
          if (d.y - d.radius < 0) {
            d.y += 10;
            d.vy = 10;
            return d.y;
          } else if (d.y + d.radius > height) {
            d.y -= 10;
            d.vy = 10;
            return d.y;
          }
          if (d.x - d.radius < 0) {
            d.x += 10;
            d.vx = 10;
            return d.x;
          } else if (d.x + d.radius > width) {
            d.x -= 10;
            d.vx = 10;
            return d.x;
          }
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = null;
          d.fy = null;
        }
      }
    }
  },
  computed: {

  },
  mounted() {
    // do
    var that = this;
    var timer = setInterval(() => {
      if (document.getElementById("TagsView").offsetWidth != 0) {
        clearInterval(timer);
        that.init();
        that.drawCircle();
      }
    }, 10);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#TagsView {
  width: 100%;
  height: 100vh;
  padding: 22px;
  text-align: center;
}

#Tags_svg {
  width: 100%;
  height: 100%;
}

</style>
