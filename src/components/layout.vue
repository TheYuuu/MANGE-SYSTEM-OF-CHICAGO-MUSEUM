<template>
  <div class="layout">
    <home></home>
    <footbar></footbar>
  </div>
</template>

<script>
import home from './home/home'
import footbar from './home/footbar'
export default {
  name: 'layout',
  components: {
    home,
    footbar
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
