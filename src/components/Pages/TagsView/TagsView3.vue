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
            <div style="font-size: 0.5rem;text-align: left;">
              Artist:{{getselectA}}
              <br>
              Country:{{getselectC}}
            </div>
           <el-carousel trigger="click" height="500px" :autoplay="false" indicator-position="outside">
            <el-carousel-item>
              Artists
              <div id="Artists">
              </div>
            </el-carousel-item>
            <el-carousel-item>
              Country
              <div id="Country">
              </div>
            </el-carousel-item>
          </el-carousel>
          <div>
          <el-button v-on:click="select()">Confirm</el-button>
          <el-button v-on:click="recover()">Recover</el-button>
          </div>
      </div>
      <span v-on:click="show()">Pick me Pick me up</span>
    </div> 
    <div class="content" id="con">
    <div v-for='(item, key) in rows' :key=key  class="rows" v-on:click="click()"
      :style ="{ height: 'calc(100% / ' + rows.length + ')' }">
      <img v-for='(i, key2) in item' :key=key2
        class="cols"
        :style ="{ background :'rgb('+i.color[0]+','+i.color[1]+','+i.color[2]+')' }" 
        :class="setClass(key,key2)"
        :src=i.src
        @click="selectImg($event)">
    </div>
    </div>
    <ViewPic ref="ViewPic"></ViewPic>
  </div>
</template>

<script>
import * as d3 from "d3";
import echarts from "echarts";
import echartsWordcloud from "echarts-wordcloud";
import ViewPic from '../ArtistView/ViewPic'
export default {
  name: "TagsView",  
  components:{
    ViewPic
  },
  data: function() {
    return {
      rows:[],
      selectShow:-101,
      timeRange: [-1000, 2010],
      Map:{
        artist:[],
        country:[]
      },
      Check:{}
    };
  },
 methods: {
   setClass(key,key2){
      return key + "_" +key2;
   },
   selectImg($event){
     var index = String($event.target.className).split(' ')[1].split('_')
     this.$refs.ViewPic.showMe([this.rows[index[0]][index[1]]],0);
     console.log(this.rows[index[0]][index[1]])
   },
   show(){
    this.selectShow=this.selectShow==0?-101:0;
    if (this.selectShow == 0){
      setTimeout(()=>{
        this.drawWord('Artists', this.$store.getters.getTagdata.artistMap, 'artist');
        this.drawWord('Country', this.$store.getters.getTagdata.countryMap, 'country');
      },100)
    }
   },
   recover(){
    var data = this.$store.getters.getTagdata.re;
    this.rows = data; 
    this.timeRange = [-1000, 2010];
    this.Map.artist = this.$store.getters.getTagdata.artistMap.map(v=>v.name);
    this.Check.artist = false;

    this.Map.country = this.$store.getters.getTagdata.countryMap.map(v=>v.name);
    this.Check.country = false;
   },
   drawWord(div,data,arr){
    const that =this;
    var chart = echarts.init(document.getElementById(div));
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
          data: data
        }
      ]
    });
    chart.on('click', function (params) {
      if (that.Check[arr]!=true){
        that.Map[arr] = [];
        that.Check[arr] = true;
      }
      that.Map[arr].push(params.data.name);
    })
   },
   select(){
    const that = this;
    console.log(that.Map)
    axios
      .post("api/tagDate", {
        type:'select',
        time:{        
          s:that.timeRange[0],
          e:that.timeRange[1]
          },
        artistMap:that.Map.artist,
        countryMap:that.Map.country
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
    getselectA(){
      if (this.Map.artist.length!= 2670)
        return this.Map.artist;
    },
    getselectC(){
      if (this.Map.country.length!= 479)
        return this.Map.country;
    }
  },
  created(){
  },
  mounted() {

    //do
    this.recover();
    // this.rows[10][1].src = 'http://localhost:3000/images/' + this.rows[10][1].Imagetitle
  },
  beforeUpdate(){
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  },
  updated(){
    this.loading.close();
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
    #Country{
    width: 100%;
    height: 100%;
  }
</style>
