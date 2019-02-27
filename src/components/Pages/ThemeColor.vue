<template>
  <div id="ThemeColor">
    <svg id="color_svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "layout",
  props: {
    msg: String,
    b:1000,
    e:2500,
  },
  computed: {
    getdata() {
      return this.data;
    }
  },
  created() {},
  methods: {
    init(data) {
      this.svg = d3.select("#color_svg");
      this.width = document.getElementById("ThemeColor").offsetWidth - 44;
      this.height = document.getElementById("ThemeColor").offsetHeight - 44;

      this.x = d3.scaleTime().range([0, this.width]);
      this.y1 = d3.scaleLinear().range([this.height / 2 - 20, 0]);
      this.y2 = d3.scaleLinear().range([this.height / 2 - 20, 0]);

      this.x.domain([new Date(data.b), new Date(data.e)]);
      this.y1.domain([0,
        d3.max(data.map, function(x) {
          return x.c;
        })
      ]);

      this.xAxis = d3.axisBottom(this.x);
    },
    DrawAxis(data) {
      var that = this;
      this.svg
        .append("g")
        .attr("class", "axis x_axis")
        .attr("transform", "translate(0," + this.height / 2 + ")")
        .attr("fill", "black")
        .call(this.xAxis);

      this.svg
        .selectAll("circle")
        .data(data.map)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) {
          return that.x(new Date(d.Date));
        })
        .attr("cy", function(d) {
          return that.y1(d.c);
        })
        .attr("fill", "red");
    },
    DrawText(){

    }
  },
  mounted() {
    var that = this;
    axios
      .post("api/dateOri", {
        Datapadding: 200,
        b:1000,
        e:2500,
      })
      .then(function(response) {
        var data = response.data;
        console.log(data)
        that.init(data);
        that.DrawAxis(data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
</style>
