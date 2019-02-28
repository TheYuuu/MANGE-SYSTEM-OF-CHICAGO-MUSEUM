<template>
  <div id="ThemeColor">
    <div class="DateChange">
      <span>Renaissance: </span>
      <span class="btn" v-on:click= 'drawBefore'>Before | </span>
      <span class="btn" v-on:click= 'drawAfter'>After | </span>
      <span class="btn" v-on:click= 'drawAll'>All</span>
    </div>
    <svg id="color_svg"></svg>
  </div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: "layout",
    props: {
      msg: String,
      data:{}
    },
    computed: {
      getdata() {
        return this.data;
      }
    },
    created() {},
    methods: {
      drawBefore() {
        let data = this.$store.getters.getOridata;
        this.Update(data.b)
      },
      drawAfter() {
        let data = this.$store.getters.getOridata;
        this.Update(data.e)
      },
      drawAll() {
        let data = this.$store.getters.getOridata;
        this.Update(data.all)
      },
      init(data) {
        this.svg = d3.select("#color_svg");
        this.width = document.getElementById("ThemeColor").offsetWidth - 44;
        this.height = document.getElementById("ThemeColor").offsetHeight - 44;
  
        this.padding = 20;
        this.interval = 1000;
        this.x = d3.scaleTime().range([0, this.width - this.padding - this.padding]);
        this.y1 = d3.scaleLinear().range([(this.height / 2 - this.padding), 0]);
        this.y2 = d3.scaleLinear().range([this.height / 2 - this.padding, 0]);
  
        var e = new Date(new Date(data.e).setYear(new Date(data.e).getFullYear() + 10));
        this.x.domain([new Date(data.b), e]);
        this.y1.domain([0,
          d3.max(data.map, function(x) {
            return x.c;
          })
        ]);
  
        this.EleTran = this.x(new Date(new Date(data.b).getFullYear() + data.Datapadding, 0, 1)) / 2;
        this.xAxis = d3.axisBottom(this.x);
      },
      DrawAxis(data) {
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const y1 = this.y1;
        const xAxis = this.xAxis;
        const EleTran = 0;
  
  
        svg.append("g")
          .attr("class", "axis x_axis")
          .attr("transform", "translate(" + padding + ',' + (height / 2 + padding) + ")")
          .attr("fill", "black")
          .call(xAxis);
  
        var linePath = d3.line()
          .x(function(d) {
            return EleTran + x(new Date(d.Date));
          })
          .y(function(d) {
            return y1(d.c);
          });
  
        svg.append('g')
          .append("path")
          .attr('class', 'numberPath')
          .attr("d", function() {
            return linePath(data.map);
          })
          .attr("transform", "translate(" + padding + "," + padding + ")")
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("stroke", 'rgb(156, 186, 188)');
  
  
        svg.append('g')
          .selectAll("circle")
          .data(data.map)
          .enter()
          .append("circle")
          .attr("transform", "translate(" + padding + "," + padding + ")")
          .attr("r", 3)
          .attr("stroke-width", 1)
          .attr("stroke", 'rgb(255, 146, 56)')
          .attr("fill", "white")
          .attr("cx", function(d) {
            return EleTran + x(new Date(d.Date));
          })
          .attr("cy", function(d) {
            return y1(d.c);
          })
      },
      DrawDescription(data) {
        const that = this;
        const svg = this.svg;
        const width = this.width;
  
        let textA;
        let textE;
  
        // svg.append('g')
        //   .append('text')
        //   .text("| After")
        //   .attr('x', function() {
        //     textE = this.getComputedTextLength();
        //     return width / 2 - textE;
        //   })
        //   .attr('y', 20)
        //   .on('click', function() {
        //     that.Update(data.e)
        //   })

        // svg.append('g')
        //   .append('text')
        //   .text("Before ")
        //   .attr('x', function() {
        //     textA = this.getComputedTextLength();
        //     return width / 2 - textE - textA;
        //   })
        //   .attr('y', 20)
        //   .on('click', function() {
        //     that.Update(data.b)
        //   })
  
        // svg.append('g')
        //   .append('text')
        //   .text("Renaissance")
        //   .attr('x', function() {
        //     return width / 2 - this.getComputedTextLength() - textE - textA;
        //   })
        //   .attr('y', 20)
  
      },
      DrawText(data) {
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const y1 = this.y1;
        const xAxis = this.xAxis;
        const EleTran = this.EleTran;
  
  
        let h = (height / 2 - padding);
        for (var i = 0; i < data.map.length; i++) {
          svg.append('g')
            .selectAll('text')
            .data(data.map[i].titles.slice(0, 10))
            .enter()
            .append('text')
            .text(function(d) {
              return d.content;
            })
            .attr("x", function(d) {
              return EleTran + x(new Date(data.map[i].Date));
            })
            .attr("y", function(d, i) {
              return h - (h / 10 * i) + h / 10 + padding - 18;
            })
        }
      },
      Update(data) {
        var e = new Date(new Date(data.e).setYear(new Date(data.e).getFullYear() + 10));
        this.x.domain([new Date(data.b), e]);
        this.y1.domain([0,
          d3.max(data.map, function(x) {
            return x.c;
          })
        ]);
  
        this.EleTran = this.x(new Date(new Date(data.b).getFullYear() + data.Datapadding, 0, 1)) / 2;
        this.xAxis = d3.axisBottom(this.x);
  
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const y1 = this.y1;
        const xAxis = this.xAxis;
        const EleTran = 0;
        const interval = this.interval;
  
        svg.select('.x_axis')
          .transition()
          .duration(interval)
          .call(xAxis);
  
        var linePath = d3.line()
          .x(function(d) {
            return EleTran + x(new Date(d.Date));
          })
          .y(function(d) {
            return y1(d.c);
          });
  
        svg.select('.numberPath')
          .transition()
          .duration(interval)
          .attr("d", function() {
            return linePath(data.map);
          })
  
        svg.selectAll("circle")
          .data(data.map)
          .attr("transform", "translate(" + padding + "," + padding + ")")
          .transition()
          .duration(interval)
          .attr("r", 3)
          .attr("stroke-width", 1)
          .attr("stroke", 'rgb(255, 146, 56)')
          .attr("fill", "white")
          .attr("cx", function(d) {
            return EleTran + x(new Date(d.Date));
          })
          .attr("cy", function(d) {
            return y1(d.c);
          })
      }
    },
    mounted() {
      var data = this.$store.getters.getOridata;
      console.log(data)
      var timer = setInterval(() => {
        if (document.getElementById("ThemeColor").offsetWidth != 0) {
          clearInterval(timer);
          this.init(data.all);
          this.DrawAxis(data.all);
          this.DrawDescription(data);
        }
      }, 10)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ThemeColor {
    width: 100%;
    height: 100vh;
    padding: 22px;
  }
  
  #color_svg {
    width: 100%;
    height: 100%;
  }

  .DateChange{
    position: absolute;
    left: 50%;
    transform: translateX(-60%);
    font-size: 14px;
  }
  .btn{
    cursor: pointer;
  }
</style>
