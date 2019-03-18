<template>
  <div id="WordCloud">12312312312312</div>
</template>

<script>
import echarts from "echarts";
import echartsWordcloud from "echarts-wordcloud";
import * as d3 from "d3";
export default {
  name: "WordCloud",
  components: {},
  methods: {
    draw(data) {
        d3.select('#WordCloud').select('div').remove();
      var chart = echarts.init(document.getElementById("WordCloud"));

      chart.setOption({
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            left: "center",
            top: "center",
            width: "70%",
            height: "80%",
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

            data: [
              {
                name: "Farrah Abraham",
                value: 366,
                textStyle: {
                  normal: {},
                  emphasis: {}
                }
              },
              {
                name: "Farrah Abraham1231231",
                value: 366,
                textStyle: {
                  normal: {},
                  emphasis: {}
                }
              }
            ]
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
</style>
