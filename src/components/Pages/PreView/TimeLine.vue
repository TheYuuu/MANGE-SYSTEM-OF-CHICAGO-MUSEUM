<template>
  <div id="TimeLine">
    <div class="DateChange">
      <span>Renaissance: </span>
      <span class="btn" v-on:click='drawBefore'>Before | </span>
      <span class="btn" v-on:click='drawAfter'>After | </span>
      <span class="btn" v-on:click='drawAll'>All</span>
    </div>
    <span class="bgText">View Times</span>
    <svg id="color_svg">
    </svg>
  </div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: "layout",
    props: {
      msg: String,
    },
    data:function(){
      return {
        data: {}
      }
    },
    computed: {
      getdata() {
        return this.data;
      }
    },
    created() {},
    methods: {
      drawBefore() {
        this.Update(this.data.b)
        this.$emit('drawBefore')
      },
      drawAfter() {
        this.Update(this.data.e)
        this.$emit('drawAfter')
      },
      drawAll() {
        this.Update(this.data.all)
        this.$emit('drawAll')
      },
      init(data) {
        this.svg = d3.select("#color_svg");
        this.width = document.getElementById("TimeLine").offsetWidth - 44;
        this.height = (document.getElementById("TimeLine").offsetHeight) - 44;
  
        this.padding = 22;
        this.interval = 500;
        this.x = d3.scaleTime().range([0, this.width - this.padding - this.padding]);
        this.y1 = d3.scaleLinear().range([(this.height - this.padding - this.padding), 0]);
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
        this.y1Axis = d3.axisRight(this.y1);
      },
      DrawAxis(data) {
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const y1 = this.y1;
        const xAxis = this.xAxis;
        const y1Axis = this.y1Axis;
        const EleTran = 0;
  
        svg.append("g")
          .attr("class", "axis tl_x_axis")
          .attr("transform", "translate(" + padding + ',' + (height - padding) + ")")
          .attr("fill", "black")
          .call(xAxis);

        svg.append("g")
          .attr("class", "axis tl_y_axis")
          .attr("transform", "translate(" + (padding/2) + ',' + (padding) + ")")
          .attr("fill", "black")
          .call(y1Axis);
          
        svg.selectAll('.tl_y_axis')
            .select('path')
            .attr('stroke','none')
        svg.selectAll('.tl_y_axis')
            .selectAll('line')
            .attr('stroke','none')

        var linePath = d3.line()
          .x(function(d) {
            if (d.correct) {
              return EleTran + x(new Date(d.Date)) - x(new Date(1900, 0, 1)) + x(new Date(-1, 0, 1));
            } else {
              return EleTran + x(new Date(d.Date));
            }
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
            if (d.correct) {
              return EleTran + x(new Date(d.Date)) - x(new Date(1900, 0, 1)) + x(new Date(-1, 0, 1));
            } else {
              return EleTran + x(new Date(d.Date));
            }
          })
          .attr("cy", function(d) {
            return y1(d.c);
          })
      },
      DrawDescription(data) { 
        const that = this;
        const svg = this.svg;
        const width = this.width;
        const height = this.height;
        const x = this.x;
        const padding = this.padding;

        svg.append('g')
           .selectAll('rect')
           .data(data.event)
           .enter()
           .append('rect')
           .attr('class','bgc')
           .attr('fill',function(d,i){
             if (i%2==0)
                return 'grey';
             else
                return 'black';
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })
           .attr('height', height - padding)
           .attr('x',function(d){
             return x(new Date(d.s,0,1)) + 20;
           })
           .attr('y',padding)
      },
      Update(data) {
        this.init(data)

        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const y1 = this.y1;
        const xAxis = this.xAxis;
        const EleTran = 0;
        const interval = this.interval;
        const y1Axis = this.y1Axis;
        const that = this;
  
        svg.select('.tl_x_axis')
          .transition()
          .duration(interval)
          .call(xAxis);

        svg.select('.tl_y_axis')
          .transition()
          .duration(interval)
          .call(y1Axis);
        
        svg.select('.tl_y_axis')
          .select('path')
          .attr('stroke','none')
        svg.select('.tl_y_axis')
          .selectAll('line')
          .attr('stroke','none')
  
        var linePath = d3.line()
          .x(function(d) {
            if (d.correct) {
              return EleTran + x(new Date(d.Date)) - x(new Date(1900, 0, 1)) + x(new Date(-1, 0, 1));
            } else {
              return EleTran + x(new Date(d.Date));
            }
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
            if (d.correct) {
              return EleTran + x(new Date(d.Date)) - x(new Date(1900, 0, 1)) + x(new Date(-1, 0, 1));
            } else {
              return EleTran + x(new Date(d.Date));
            }
          })
          .attr("cy", function(d) {
            return y1(d.c);
          })
          var rects= svg.selectAll('.bgc').data(data.event);
          
          rects.transition()
           .duration(interval)
           .attr('fill',function(d,i){
             if (i%2==0)
                return 'grey';
             else
                return 'black';
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })
           .attr('height', height -padding*2)
           .attr('x',function(d){
             return x(new Date(d.s,0,1)) + 20;
           })
           .attr('y',20)

          rects.enter().append('rect')
           .attr('class','bgc')
           .attr('x',function(d){
             return x(new Date(d.s,0,1)) + 20;
           })
           .attr('y',20)
           .attr('height', height -padding*2)
           .transition()
           .duration(interval)
           .attr('fill',function(d,i){
             if (i%2==0)
                return 'grey';
             else
                return 'black';
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })


          rects.exit().transition()
           .duration(interval)
           .attr('width', 0)
           .remove()

          svg.selectAll('.bgc')
          .on('click',function(d,i){
            if(svg.selectAll('.colorRect')._groups[0].length==0){
              that.$emit('changeTimes',{d,i});
            }
          })
          .on('mouseover',function(d,i){
             d3.select(this)
               .transition()
               .duration(200)
               .attr('opacity','0.3')
               .attr('stroke','black')
            d3.select('.bgText').html(d.name)
           })
           .on('mouseout',function(){
            d3.select(this)
               .transition()
               .duration(100)
               .attr('opacity','0.1')
               .attr('stroke','none')
              svg.select('.bgText').html('View Times')
           })
      }
    },
    mounted() {
      var data = this.$store.getters.getOridata;
      this.data = data;
      var timer = setInterval(() => {
        if (document.getElementById("TimeLine").offsetWidth != 0) {
          clearInterval(timer);
          this.init(data.all);
          this.DrawDescription(data.all);
          this.DrawAxis(data.all);
          this.Update(data.all);
        }
      }, 10)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #TimeLine {
    width: 100%;
    height: 100%;
    padding: 22px;
  }
  
  #color_svg {
    width: 100%;
    height: 100%;
  }
  
  .DateChange {
    z-index: 99;
    position: absolute;
    left: 50%;
    transform: translateX(-60%);
    font-size: 14px;
  }
  
  .btn {
    cursor: pointer;
  }
  
  .bgText{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 5rem;
    top: 25%;
    z-index: -1;
    white-space: nowrap;
  }
</style>
