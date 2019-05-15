<template>
  <div id="ArtistView">
    <svg id="story_svg">
      <defs>
        <template v-for="(item,index) in data">
          <pattern
            :key="item.name"
            :id="'n' + String(index)"
            patternUnits="userSpaceOnUse"
            height="50"
            width="50"
          >
            <image x="0" y="0" height="50" width="50" :xlink:href="item.pic"></image>
          </pattern>
        </template>
      </defs>
      <text id="centerText">Mouseover To View</text>
    </svg>
    <ViewPic ref="ViewPic"></ViewPic>
  </div>
</template>

<script>
import * as d3 from "d3";
import { setTimeout } from "timers";
import ViewPic from "./ViewPic";

export default {
  name: "ArtistView",
  components: {
    ViewPic
  },
  data: function() {
    return {
      data: {},
      list: []
    };
  },
  computed: {
    phosrc() {
      return this.data;
    }
  },
  methods: {
    init(data) {
      this.svg = d3.select("#story_svg");
      this.width = document.getElementById("ArtistView").offsetWidth - 44;
      this.height = document.getElementById("ArtistView").offsetHeight - 44;

      this.padding = 20;
      this.interval = 1000;
    },
    drawCircle(data) {
      const that = this;
      const width = this.width;
      const height = this.height;

      var nodes = d3.range(data.length).map(function(d, i) {
        return { name: i, radius: data[i].works.length / 2 + 1 };
      });
      var root = {
        name: -1,
        radius: height / 3
      };
      nodes.unshift(root);

      const svg = this.svg;

      d3.select("#centerText")
        .attr("x", function() {
          return width / 2 - this.getComputedTextLength() / 2;
        })
        .attr("y", height / 3);

      drawForce(nodes, 0);
      addEvent();

      function addEvent() {
        var Ifclick = false;
        d3.selectAll(".circle")
          .on("mouseover", function(d) {
            if (Ifclick) return;
            d3.select(this)
              .attr("stroke-width", "2px")
              .attr("r", d.radius + 20)
              .attr("stroke-dasharray", "0,0");

            d3.select("#centerText")
              .text(data[d.name].name)
              .attr("x", function() {
                return width / 2 - this.getComputedTextLength() / 2;
              });

            svg
              .append("text")
              .attr("class", "dateText")
              .text(
                "Life: " +
                  new Date(data[d.name].s).getFullYear() +
                  " - " +
                  new Date(data[d.name].e).getFullYear()
              )
              .attr("x", function() {
                return width / 2 - this.getComputedTextLength() / 2;
              })
              .attr("y", height / 3 + 30);

            svg
              .append("text")
              .attr("class", "dateText")
              .text("Birth Place: " + data[d.name].place)
              .attr("x", function() {
                return width / 2 - this.getComputedTextLength() / 2;
              })
              .attr("y", height / 3 + 60);
          })
          .on("mouseleave", function(d) {
            d3.select(this)
              .attr("stroke-width", "1px")
              .attr("r", d.radius)
              .attr("stroke-dasharray", "5,5");

            if (Ifclick) return;
            d3.select("#centerText")
              .text("Mouseover To View")
              .attr("x", function() {
                return width / 2 - this.getComputedTextLength() / 2;
              });

            d3.selectAll(".dateText").remove();
          })
          .on("click", function(d) {
            Ifclick = true;
            d3.select("#ArtistView")
              .append("img")
              .attr("id", "person")
              .attr("src", data[d.name].pic)
              .style("position", "fixed")
              .style("height", (root.radius / 3) * 2 + "px")
              .style("opacity", 0)
              .on("click", function() {
                d3.select(this).remove();
                d3.selectAll(".dateText").remove();
                d3.select("#centerText")
                  .text("Mouseover To View")
                  .attr("x", function() {
                    return width / 2 - this.getComputedTextLength() / 2;
                  })
                  .attr("y", height / 3);
                d3.selectAll("circle")
                  .transition()
                  .duration(1000)
                  .attr("r", 0)
                  .remove();

                setTimeout(() => {
                  drawForce(nodes, 0);
                  addEvent();
                }, 1000);
              });
              setTimeout(() => {
                  d3.select("#person")
                  .style("top", height / 2 - (root.radius / 3) * 2 + "px")
                  .style("left",width / 2 - document.getElementById("person").offsetWidth / 2 +20 + "px"
                  )
                  .transition()
                  .duration(1000)
                  .style("opacity", 1);
                }, 1000);



            //-------------------------------

            d3.selectAll(".circle")
              .transition()
              .duration(1000)
              .attr("r", 0)
              .remove();

            svg
              .selectAll("text")
              .transition()
              .duration(1000)
              .delay(1000)
              .attr("y", function(d, i) {
                return height / 2 + i * 30 + 20;
              });

            var t = data[d.name].works.map(v=>{
              v.Date = new Date(v.Date).toDateString();
              return v;
            });
            that.list = t;
            console.log(t)
            var nodes2 = d3.range(t.length).map(function(d, i) {
              return {
                name: t[i].Title,
                radius: 10,
                color:
                  "rgb(" +
                  t[i].color[0] +
                  "," +
                  t[i].color[1] +
                  "," +
                  t[i].color[2] +
                  ")",
                num: i
              };
            });
            nodes2.unshift(root);

            setTimeout(() => {
              drawForce(nodes2, 1);
            }, 2000);
          });
      }

      function drawForce(nodes, type) {
        d3.select(".nodes").remove();
        console.log(nodes);
        var node;
        if (type == 0) {
          var simulation = d3
            .forceSimulation()
            .force(
              "forceX",
              d3
                .forceX()
                .strength(0.1)
                .x(width * 0.5)
            )
            .force(
              "forceY",
              d3
                .forceY()
                .strength(0.1)
                .y(height * 0.5)
            )
            .force(
              "center",
              d3
                .forceCenter()
                .x(width * 0.5)
                .y(height * 0.5)
            )
            .force("charge", function(d, i) {
              return i ? 0 : -2000;
            });

          var color = d3.scaleOrdinal(d3.schemeCategory10);

          simulation
            .nodes(nodes)
            .force(
              "collide",
              d3
                .forceCollide()
                .strength(0.5)
                .radius(function(d) {
                  if (d.name == -1) return d.radius + 10;
                  return d.radius + 5;
                })
                .iterations(1)
                .strength(0.3)
            )
            .on("tick", ticked);

          node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("stroke", "black")
            .attr("stroke-dasharray", "5,5")
            .attr("fill", function(d, i) {
              return "url(#n" + d.name + ")";
            })
            .attr("class", function(d, i) {
              if (d.name != -1) return "circle n" + d.name;
              return "n" + d.name;
            })
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .call(
              d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .attr("r", function(d) {
              return d.radius;
            });
        } else {
          var simulation = d3
            .forceSimulation(nodes)
            .force("charge", d3.forceCollide().radius(5))
            .force(
              "collide",
              d3
                .forceCollide()
                .strength(0.5)
                .radius(function(d) {
                  if (d.name == -1) return d.radius + 10;
                  return d.radius + 5;
                })
                .iterations(1)
                .strength(0.3)
            )
            .force(
              "r",
              d3.forceRadial(function(d) {
                return (root.radius * 5) / 4;
              })
            )
            .on("tick", function() {
              node
                .attr("cx", function(d) {
                  return d.x;
                })
                .attr("cy", function(d) {
                  return d.y;
                });
            });

          var color = d3.scaleOrdinal(d3.schemeCategory10);

          node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("transform", function(d, i) {
              if (i != 0)
                return "translate(" + 0.5 * width + "," + 0.5 * height + ")";
            })
            .attr("stroke", "black")
            .attr("stroke-dasharray", "5,5")
            .attr("fill", function(d, i) {
              if (d.name == -1) return "none";
              return d.color;
            })
            .attr("class", function(d, i) {
              if (d.name == -1) return "circle n" + d.name;
              return d.name;
            })
            .attr("r", function(d) {
              return d.radius;
            })
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .on("mouseover", function(d) {
              svg
                .append("text")
                .attr("class", "dateText titleText")
                .text(d.name)
                .attr("x", function() {
                  return width / 2 - this.getComputedTextLength() / 2;
                })
                .attr("y", height / 2 + 3 * 30 + 20);

              svg
                .append("text")
                .attr("class", "dateText titleText")
                .text(d.Date)
                .attr("x", function() {
                  return width / 2 - this.getComputedTextLength() / 2;
                })
                .attr("y", height / 2 + 3 * 30 + 20);
            })
            .on("mouseleave", function() {
              svg.selectAll(".titleText").remove();
            })
            .on("click", function(d) {
              that.$refs.ViewPic.showMe(that.list, d.index - 1);
            });
        }

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

              if (d.name == "-1") {
                d.fy = height / 2;
                d.fx = width / 2;
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
  mounted() {
    var data = this.$store.getters.getStorydata;
    this.data = data;
    var that = this;
    var timer = setInterval(() => {
      if (document.getElementById("ArtistView").offsetWidth != 0) {
        clearInterval(timer);
        that.init(data);
        that.drawCircle(data);
      }
    }, 10);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ArtistView {
  width: 100%;
  height: 100vh;
  padding: 22px;
  font-weight: bolder;
}

#story_svg {
  width: 100%;
  height: 100%;
}
</style>
