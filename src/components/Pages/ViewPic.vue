<template>
  <div class="ViewPic" v-if="BackgroundShow">
    <div class='mianpic'>
        <div class="main">
          <div class="imgDiv">
            <img :src="'http://localhost:3000/images/' + showPic.Imagetitle" 
                  alt="loading" 
                  class="showpic"
                  id='showpic'>
          </div>
           <div class="InfDiv">
              <p>Artist: {{showPic.Artist}}</p>
              <hr>
              <p>Title: {{showPic.Title}}</p>
              <hr>
              <p>Date: {{showPic.Date}}</p>
              <hr>
              <p>Origin: {{showPic.Origin}}</p>
              <hr>
              <p>Dimensions: {{showPic.Dimensions}}</p>
              <hr>
              <p>On View: {{showPic['On View']}}</p>
              <hr>
              <p>Currently Off View: {{showPic['Currently Off View']}}</p>
              <hr>
              <p>Dimensions: {{showPic.Dimensions}}</p>
              <hr>
              <p>Copyright: {{showPic.Copyright}}</p>
              <hr>
              <p>Credit Line: {{showPic['Credit Line']}}</p>
              <hr>
              <p>Reference Number: {{showPic['Reference Number']}}</p>
              <hr>
              <p>Introduction: {{showPic['Introduction']}}</p>
              <hr>
          </div>
        </div>
        <div class="left PreAndNext" v-on:click="Pre()">Pre</div>
        <div class="right PreAndNext" v-on:click="Next()">Next</div>
    </div>
    <div class="list" id='list'>
    <ul class="list_ul" :style="{ left : Move + 'px' }">
      <template>
          <li v-for='(item, index) in list' 
              :class = "{choosed: index == showIndex}"  
              v-on:click='showIndex = index'
              :key = index>
            <img :src="'http://localhost:3000/images/' + item.Imagetitle"  alt="">
          </li>
      </template>
    </ul>
    </div>
    <span class='close' v-on:click="BackgroundShow = false">Close</span>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'ViewPic',
  data:function(){
    return {
      maxWidth:'',
      Move:'0',
      BackgroundShow:false,
      showIndex:0,
      list:[]
    }
  },
  computed:{
    getMove(){
      return this.Move;
    },
    showPic(){
      return this.list[this.showIndex]
    }
  },
  methods:{
    showMe(list, index){
      this.list = list;
      this.showIndex = index;
      this.BackgroundShow = true;
    },
    Next(){
      if (this.showIndex+1<this.list.length){
        this.showIndex++;
        this.UlMove();
      }
    },
    Pre(){
      if (this.showIndex-1>=0){
        this.showIndex--;
        this.UlMove();
      }
    },
    UlMove(){
      if (document.getElementsByClassName("choosed")[0].getBoundingClientRect().right - this.maxWidth - 100 > 0){
        this.Move = - 2 * document.getElementsByClassName("choosed")[0].offsetWidth;
      }
      else if (document.getElementsByClassName("choosed")[0].getBoundingClientRect().left - 100 < 0){
        this.Move = 2 * document.getElementsByClassName("choosed")[0].offsetWidth;
      }
    }
  },
  mounted () {
      this.maxWidth = document.getElementById("app").offsetWidth;
  },
  updated(){
    if (this.BackgroundShow){
      this.UlMove();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  transition:all 0.5s;
}
.ViewPic{
  width: 100%;
  height: 100vh;
  position: fixed;
  top:0px;
  left:0px;
  background: black;
  z-index: 999;
}

.showpic{
  max-height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform:  translate(calc(-50% - 100px), -50%);
}

.mianpic{
  display: table-cell;
  width: 100vw;
  height: 80vh;
  padding-left: 150px;
  padding-right: 150px;
  text-align: center;
  vertical-align: middle;
}

.list{
    width: 100%;
    height: 20%;
}

.list_ul{
    height: 100%;
    width: 100000px;
    padding: 30px 0;
    margin: 0 20px;
    overflow: auto;
    position: relative;
}

.list_ul li{
  height: 100%;
  float: left;
  margin: 0 3px;
  list-style: none;
}

.list_ul li:hover{
  margin: 0 5px;
  border: 2px solid #6494fb;
  height: 120%;
}

.list_ul img{
  height: 100%;
}

.choosed{
    margin: 0 10px;
    border: 2px solid #6494fb;
    height: 120%!important;
}

.PreAndNext{
  float: left;
  color:white;
  cursor: pointer;
  user-select:none;
  position: relative;
  padding: 20% 0;  
}

.left{
  width:150px;  
  height: 100%;   
  margin-left: -100%;
  left: -150px;
}  
.main{
  width:100%;   
  height: 100%;
  position: relative;
  float: left;
}  
.right{  
  width:150px;  
  height: 100%;   
  margin-left: -150px;
  right:-150px;
}  
.close{
  position: fixed;
  top:10px;
  right:50px;
  color: white;
  z-index: 10;
  cursor: pointer;
}

.imgDiv{
  height: 100%;
  width: 70%;
  float: left;
  color: white
}
.InfDiv{
  max-height: 80vh;
  width: 30%;
  float: left;
  color: white;
  text-align: left;
  font-size: 0.6rem;
  overflow: auto;
  padding: 10px 0;
}
</style>
