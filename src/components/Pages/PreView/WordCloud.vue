<template>
  <div class = 'WordCloud'>
    <div class="backword" v-on:click="showWords">
      <span>Back</span>
    </div>
    <div id="WordCloud">12312312312312</div>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsWordcloud from "echarts-wordcloud";
import * as d3 from "d3";
export default {
  name: "WordCloud",
  components: {},
  methods: {
    showWords(){
      this.$emit('showWords');
    },
    draw(data) {
      console.log(data);

      var chart = echarts.init(document.getElementById("WordCloud"));

      chart.setOption({
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            left: "center",
            top: "center",
            width: "90%",
            height: "90%",
            right: null,
            bottom: null,
            sizeRange: [12, 60],

            rotationRange: [-90, 90],
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
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#WordCloud {
  width: 100%;
  height: 100%;
  padding: 22px;
}
.WordCloud{
    width: 100%;
  height: 100%;
}
.backword{
  position: absolute;
  left: 50%;
  top: 0;
}

</style>
