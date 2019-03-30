<template>
  <div id="MainPre">
    <transition
      :duration='{ enter: 1000, leave: 100 }'
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'>
        <svg v-show='!getshowWord' id="MainPre_svg"></svg>
    </transition>
      <transition
      :duration='{ enter: 1000, leave: 100 }'
      enter-active-class='animated fadeInDown'
      leave-active-class='animated fadeOut'>
        <WordCloud v-show='getshowWord' ref='WordCloud' @showWords='showWords()'></WordCloud>
    </transition>
  </div>
</template>

<script>
import * as d3 from "d3";
import { setTimeout } from 'timers';

import WordCloud from './WordCloud'

export default {
  name: 'MainPre',
  data:function(){
    return {
      type:'all',
      showWord:false,
      textContent:[],
      DateShow:1
    }
  },
  components: {
    WordCloud
  },
  computed:{
    getshowWord(){
      return this.showWord;
    }
  },
  methods:{
    Datechange(){
      this.DateShow = this.DateShow ? 0 : 1;
      console.log(d3.select('.bgText'))
      d3.select('.bgText').style('opacity',this.DateShow);
    },
    showWords(){
      this.Datechange();
      this.showWord = ! this.showWord
    },
    changeTimes(times){
      this.Update(this.data[this.type].timecountry[times.i])
    },
    drawBefore() {
      this.type = 'b'
      this.Update(this.data.b)
    },
    drawAfter() {
      this.type = 'e'
      this.Update(this.data.e)
    },
    drawAll() {
      this.type = 'all'
      this.Update(this.data.all)
    },
    init(data) {
      this.svg = d3.select("#MainPre_svg");
      this.width = document.getElementById("MainPre").offsetWidth - 44;
      this.height = document.getElementById("MainPre").offsetHeight - 44;
      this.interval=500;
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
      const interval = this.interval;


      svg
        .append("g")
        .attr("class", "axis main_y_axis")
        .attr("transform", "translate(" + padding + "," + padding + ")")
        .attr("fill", "black")
        .transition()
        .duration(interval)
        .call(yAxis);

      svg
        .append("g")
        .attr("class", "axis main_x_axis")
        .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
        .attr("fill", "black")
        .transition()
        .duration(interval)
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
      const that = this;

      for (let i=0;i<data.allcountrys.length;i++){
        var color = d3.scaleQuantile()
                      .domain(d3.range(data.allcountrys[i].color.length))
                      .range(data.allcountrys[i].color.map(d=>{
                        return 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')';
                      }));

        svg.append('g')
        .selectAll('rect')
        .data(d3.range(data.allcountrys[i].color.length))
        .enter()
        .append('rect')
        .attr('class','bgc' + i)
        .attr('fill', function(d,i){
             return color(i)
            // return 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')';
        })
        .attr('width',rectWidth)
        .attr('height', function(d){
          return (height - y(data.allcountrys[i].works.length)) / data.allcountrys[i].color.length;
        })
        .attr('x',function(d){
          return x(data.allcountrys[i].name) + axisstep / 2 - padding;
        })
        .attr('y', function(d,j){
          return y(data.allcountrys[i].works.length) + ( (height - y(data.allcountrys[i].works.length)) / data.allcountrys[i].color.length * j)  - padding
        })
        .on('click',function(d){
          that.showWords()
          if (that.showWord){
            setTimeout(()=>{
              that.$refs.WordCloud.draw(data.allcountrys[i].titles);
            },1000)

          }
        })
      }
    },
    Update(data) {
      this.init(data);

      const svg = this.svg;
      const height = this.height;
      const padding = this.padding;
      const x = this.x;
      const y = this.y;
      const axisstep = this.axisstep
      const rectWidth = this.rectWidth
      const interval = this.interval
      const xAxis = this.xAxis
      const yAxis = this.yAxis

      svg.select('.main_y_axis')
        .transition()
        .duration(interval)
        .call(yAxis);

      svg.select('.main_x_axis')
        .transition()
        .duration(interval)
        .call(xAxis);
        


      for (let j=0;j<data.allcountrys.length;j++){
        var color = d3.scaleQuantile()
                      .domain(d3.range(data.allcountrys[j].color.length))
                      .range(data.allcountrys[j].color.map(d=>{
                        return 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')';
                      }));
         
        let update = svg.selectAll('.bgc' + j)
                        .data(d3.range(data.allcountrys[j].color.length));
        
        update.transition()
           .duration(interval).attr('fill', function(d){
             return color(d)
        })
        .attr('width',rectWidth)
        .attr('height', function(d){
          return (height - y(data.allcountrys[j].works.length)) / data.allcountrys[j].color.length;
        })
        .attr('x',function(d){
          return x(data.allcountrys[j].name) + axisstep / 2 - padding;
        })
        .attr('y', function(d,i){
          return y(data.allcountrys[j].works.length) + ( (height - y(data.allcountrys[j].works.length)) / data.allcountrys[j].color.length * i)  - padding
        })

        update.enter().append('rect')
          .attr('class','bgc' + j)
           .attr('fill', function(d){
             return color(d)
        })
        .attr('width',rectWidth)
        .attr('x',function(d){
          return x(data.allcountrys[j].name) + axisstep / 2 - padding;
        })
        .attr('y', function(d,i){
          return y(data.allcountrys[j].works.length) + ( (height - y(data.allcountrys[j].works.length)) / data.allcountrys[j].color.length * i)  - padding
        })          
        .transition()
        .duration(interval)
        .attr('height', function(d){
          return (height - y(data.allcountrys[j].works.length)) / data.allcountrys[j].color.length;
        })
        
        update.exit()
          .transition()
          .duration(interval)
          .attr('height', 0)
          .remove()
      }
    },
  },
  mounted(){
    var data = this.$store.getters.getOridata;
    this.data = data;
    var that = this;
    var timer = setInterval(() => {
      if (document.getElementById("MainPre").offsetWidth != 0) {
        clearInterval(timer);
        that.init(data.all);
        that.drawRect(data.all);
        that.drawAxis(data.all);
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
.showWord {
  z-index: 99;
  position: absolute;
  left: 50%;
  transform:translateX(-50%);
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
</style>
