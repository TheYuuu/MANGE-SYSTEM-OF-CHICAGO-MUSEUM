<template>
  <div id="ThemeColor">
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
      data: {}
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
          .attr("class", "axis x_axis")
          .attr("transform", "translate(" + padding + ',' + (height / 2 + padding) + ")")
          .attr("fill", "black")
          .call(xAxis);

        svg.append("g")
          .attr("class", "axis y1_axis")
          .attr("transform", "translate(" + (10) + ',' + (padding*2) + ")")
          .attr("fill", "black")
          .call(y1Axis);
          
        d3.select('.y1_axis')
          .select('path')
          .attr('stroke','none')
        d3.select('.y1_axis')
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

        svg.append('g')
           .selectAll('rect')
           .data(data.event)
           .enter()
           .append('rect')
           .attr('class','bgc')
           .attr('fill',function(d){
             return d.color;
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })
           .attr('height', height/2)
           .attr('x',function(d){
             return x(new Date(d.s,0,1)) + 20;
           })
           .attr('y',20)

      },
      DrawText(data) {
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
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
      DrawColors(data,index=0){
        const svg = this.svg;
        const height = this.height;
        const padding = this.padding;
        const x = this.x;
        const interval = this.interval;

        data = data[index];
        var s = data.s;
        var e = data.e;
        var p = x(new Date(e,0,1)) - x(new Date(s,0,1));

        var colorx = d3.scaleQuantize()
        .domain([0 , p])
        .range(data.colors.map(v=>{
          return 'rgb('+v[0]+','+v[1]+','+v[2]+')';
        }))
        p = p/10;
        var colornum=d3.range(10);

        svg.append('g')
          .attr('class','color_g')
          .selectAll('.colorRect')
          .data(colornum)
          .enter()
          .append('rect')
          .attr('class', 'colorRect')
          .attr('height', height/2)
          .attr('x',function(d,i){
            return x(new Date(s,0,1)) + (i)*p +padding
          })
          .attr('y',padding)
          .attr('fill',function(d,i){
            return  colorx((i)*p)
          })
          .transition()
          .duration(300)
          .attr('width',p)

        d3.select('.color_g').append('rect')
          .attr('x',function(d,i){
            return x(new Date(s,0,1)) +padding
          })
          .attr('y',padding)
          .attr('width',x(new Date(e,0,1)) - x(new Date(s,0,1)))
          .attr('height', height/2)
          .attr('fill','transparent')
        .on('mouseleave',function(){
            d3.selectAll('.colorRect')
              .transition()
               .duration(100)
               .attr('fill','white')
               .remove();
            d3.select('.color_g').remove()
          })
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
        this.y1Axis = d3.axisRight(this.y1);

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
  
        svg.select('.x_axis')
          .transition()
          .duration(interval)
          .call(xAxis);

        svg.select('.y1_axis')
          .transition()
          .duration(interval)
          .call(y1Axis);
        
        d3.select('.y1_axis')
          .select('path')
          .attr('stroke','none')
        d3.select('.y1_axis')
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
           .attr('fill',function(d){
             return d.color;
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })
           .attr('height', height/2)
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
           .attr('height', height/2)
           .transition()
           .duration(interval)
           .attr('fill',function(d){
             return d.color;
           })
           .attr('opacity','0.1')
           .attr('width',function(d){
             return x(new Date(d.e,0,1)) - x(new Date(d.s,0,1));
           })


          rects.exit().transition()
           .duration(interval)
           .attr('width', 0)
           .remove()

          d3.selectAll('.bgc')
          .on('click',function(d,i){
            if(d3.selectAll('.colorRect')._groups[0].length==0){
              that.DrawColors(data.finalcolor,i);
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
              d3.select('.bgText').html('View Times')
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
  #ThemeColor {
    width: 100%;
    height: 100vh;
    padding: 22px;
  }
  
  #color_svg {
    width: 100%;
    height: 100%;
  }
  
  .DateChange {
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
