<template>
  <div class="layout">
    <transition
      :duration="{ enter: 1000, leave: 800 }"
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
      v-on:after-leave="afterLeave"
    >
      <div v-show="Titleshow" class="title-box">
        <p class="welcome-title-1">WELCOME TO MANGE SYSTEM OF CHICAGO MUSEUM</p>
        <p class="welcome-title-2">Organized By</p>
        <div class="welcome-title-3">
          <div class="col-3" v-on:click="Titleshow = !Titleshow">
            <router-link to="/ObjectCategory">
              <p class="sm-p">Object</p>
              <p>category</p>
            </router-link>
          </div>
          <div class="col-3" v-on:click="Titleshow = !Titleshow">
            <router-link to="StoryLine">
              <p class="sm-p">Story</p>
              <p>Line</p>
            </router-link>
          </div>
          <div class="col-3" v-on:click="Titleshow = !Titleshow">
            <router-link to="ThemeColor">
              <p class="sm-p">Theme</p>
              <p>Color</p>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeOutDown" leave-active-class="animated fadeOutUp">
      <keep-alive>
        <router-view v-show="Mainshow"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "layout",
  data: function() {
    return {
      Titleshow: false,
      Mainshow: false
    };
  },
  methods: {
    afterLeave: function() {
      this.Mainshow = true;
    }
  },
  mounted() {
    this.Titleshow = true;
    this.Mainshow = true;
  },
  computed: {},
  watch: {
    $route(to, from) {
        if (from.path=="/ObjectCategory" || from.path=="/StoryLine" || from.path=="/ThemeColor" && to.path=='/welcome'){
          this.Titleshow = true;
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-box {
  width: 100%;
}
.welcome-title-1 {
  font-family: Patriciana;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
}
.welcome-title-2 {
  font-family: Patriciana;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;
}
.welcome-title-3 {
  padding: 0px 25%;
}
@font-face {
  font-family: "Patriciana";
  src: url("../assets/Patriciana.otf");
}

.col-3 {
  width: 33.333333%;
  display: inline-block;
  text-align: center;
  font-size: 1.5rem;
  font-family: Patriciana;
  font-weight: bold;
  cursor: pointer;
}

.col-3 a {
  text-decoration: none;
  color: black;
}
.col-3 a:visited {
  text-decoration: none;
  color: black;
}

.slide-left-enter-active {
  transition-delay: 0.5s;
}
</style>
