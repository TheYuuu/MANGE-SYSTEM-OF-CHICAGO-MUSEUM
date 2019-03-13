<template>
  <div class="Tags">
    <p v-on:click='addTag(arr)'>{{arr}}</p>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Tags',
  props: {
    arr:Object
  },
  methods:{
    addTag(params){
      this.$emit('AddTags', params)
    }
  },
  mounted () {
    console.log(this.arr)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Tags{
  width: 100%;
  height: 100%;
  background: bisque;
}
</style>
