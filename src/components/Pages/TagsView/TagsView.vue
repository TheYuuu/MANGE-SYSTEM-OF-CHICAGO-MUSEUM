<template>
  <div class="TagsView">
    <div class="Pre" v-on:click="Pre()">Pre</div>
    <div class="Next" v-on:click="Next()">Next</div>
      <transition-group
        :duration="{ enter: 800, leave: 800 }"
        enter-active-class="animated pulse"
        leave-active-class="animated pulse">
        <div
          animate-delay="1s"
          class="container"
          v-for="(item,index) in list"
          :key="item.name"
          v-show="index == getShowIndex"
        >
          <Tags :arr="list[index]"
                @AddTags='AddTags'
                ref = "Tag"></Tags>
        </div>
      </transition-group>
  </div>
</template>

<script>
import Tags from "./Tags";
import { appendFile } from 'fs';
import { inherits } from 'util';
import { setTimeout } from 'timers';
export default {
  name: "TagsView",
  components: {
    Tags
  },
  data: function() {
    return {
      TagsMap:[],
      tags: [],
      showindex: 0,
      list: [
        {
          name: "Artist",
          tags: ["A", "B", "C", "D"]
        },
        {
          name: "Country",
          tags: ["A", "B", "C", "D"]
        },
        {
          name: "Color",
          tags: ["A", "B", "C", "D"]
        },
        {
          name: "Cate",
          tags: ["A", "B", "C", "D"]
        }
      ]
    };
  },
  methods: {
    AddTags(params) {
      this.tags.push(params);
      console.log(this.tags);
    },
    Pre() {
      if (this.showindex > 0) {
        this.showindex--;
      }
    },
    Next() {
      if (this.showindex + 1 < this.list.length) {
        this.showindex++;
        this.draw(this.showindex);
      }
    },
    draw(index){
      if (this.TagsMap[index] != 1){
          this.$refs['Tag'][this.showindex].Start();
          this.TagsMap[index] = 1;
      }
    }
  },
  computed: {
    getShowIndex() {
      return this.showindex;
    }
  },
  mounted() {
    // do
     this.draw(0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TagsView {
  width: 100%;
  height: 100vh;
  padding: 22px;
  text-align: center;
}
.container {
  width: 100%;
  height: 100%;
}
.Next {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translate(0, -50%);
  z-index: 99;
  cursor: pointer;
}
.Pre {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0, -50%);
  z-index: 99;
  cursor: pointer;
  user-select: none;
}
#tags_svg{
  background: black;
  position: absolute;
  top:50%;
}
</style>
