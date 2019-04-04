<template>
  <div id="TagsView">
    <div class="select"
      :style ="{ transform: 'translate(-50%,'+  selectShow + '%' +')' }" >
      <div class="con">
            <div>
              TimeRange: {{timeRange[0]}}-{{timeRange[1]}}
            </div>
            <el-slider
              v-model="timeRange"
              range
              :min="-1000"
              :max="2010">
            </el-slider>
           <el-carousel trigger="click" height="500px" :autoplay="false" indicator-position="outside">
            <el-carousel-item>
              Artists
              <div id="Artists">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div>
                Artists
              </div>
            </el-carousel-item>
          </el-carousel>
          <div>
          <el-button v-on:click="select()">Confirm</el-button>
          <el-button v-on:click="recover()">Recover</el-button>
          </div>
      </div>
      <span v-on:click="show()">o</span>
    </div> 
    <div class="content">
    <div v-for='(item, key) in rows' :key=key  class="rows" v-on:click="click()"
      :style ="{ height: 'calc(100% / ' + rows.length + ')' }">
      <img v-for='(i, key2) in item' :key=key2
        class="cols"
        :style ="{ background :'rgb('+i.color[0]+','+i.color[1]+','+i.color[2]+')' }" 
        :class={hover:i.hover}>
    </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import echarts from "echarts";
import echartsWordcloud from "echarts-wordcloud";
import { setTimeout } from 'timers';
export default {
  name: "TagsView",
  data: function() {
    return {
      rows:[],
      selectShow:0,
      timeRange: [-1000, 1000],
      artistMap:[]
    };
  },
 methods: {
   show(){
    this.selectShow=this.selectShow==0?-101:0;
    if (this.selectShow == 0){
      setTimeout(()=>{
        this.drawWord();
      },100)
    }
   },
   recover(){
    var data = this.$store.getters.getTagdata.re;
    this.rows = data; 
    this.artistMap = this.$store.getters.getTagdata.artistMap
    this.artistMapCheck = false;
   },
   drawWord(){
    const that =this;
    var chart = echarts.init(document.getElementById("Artists"));
    chart.setOption({
      series: [
        {
          type: "wordCloud",
          shape: "circle",
          left: "center",
          top: "center",
          width: "100%",
          height: "100%",
          right: null,
          bottom: null,
          sizeRange: [12, 60],

          rotationRange: [-0, 0],
          rotationStep: 45,

          gridSize: 8,

          drawOutOfBound: false,

          textStyle: {
            normal: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
              // Color can be a callback function or a color string
              color: function() {
                // Random color
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(",") +
                  ")"
                );
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: "#333"
            }
          },
          data: that.$store.getters.getTagdata.artistMap
        }
      ]
    });
    chart.on('click', function (params) {
      if (that.artistMapCheck!=true){
        that.artistMap=[];
        that.artistMapCheck = true;
      }
      that.artistMap.push(params.data.name);
    })
   },
   select(){
    const that = this;
    console.log(that.artistMap)
    axios
      .post("api/tagDate", {
        type:'select',
        time:{        
          s:that.timeRange[0],
          e:that.timeRange[1]
          },
        artistMap:that.artistMap
      })
      .then(function(response) {
        var d = response.data.timeres;
        that.rows = d;
      })
      .catch(function(error) {
        console.log(error);
      });
   },
   click(){
     console.log(1)
   }
  },
  computed: {

  },
  created(){
  },
  mounted() {
    //do
    this.recover();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  transition: all 0.5s;
}

#TagsView {
  width: 100%;
  height: 100vh;
  padding: 22px;
  text-align: center;
}
.rows{
  display: flex;
  width: 100%;
}
.cols{
  flex:1;
}
.cols:hover{
  border: 1px solid white;
  transform: perspective(500px) translate3d(0px, 0px, 250px);
}

.hover{
  border: 1px solid white;
  transform: perspective(500px) translate3d(0px, 0px, 250px);
}

.content{
  width:100%;
  height:100%;
  border: 1px solid black;
}
.con{
  width:100%;
  height:100%;
  padding: 10px;
}
.select{
  width: 1000px;
  height: 700px;
  border: 1px solid sandybrown;
  background: white;
  position: fixed;
  transform: translate(-50%,0);
  left: 50%;
  top: 0;
  z-index: 999;
  cursor: pointer;
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  #Artists{
    width: 100%;
    height: 100%;
  }
</style>
