<template>
  <div class='home'>
    <transition
      :duration='{ enter: 1000, leave: 800 }'
      enter-active-class='animated fadeInDown'
      leave-active-class='animated fadeOutUp'
      v-on:after-leave='afterLeave'
    >
      <div v-show='Titleshow' class='title-box'>
        <p class='welcome-title-1'>WELCOME TO MANGE SYSTEM OF CHICAGO MUSEUM</p>
        <p class='welcome-title-2'>Organized By</p>
        <div class='welcome-title-3'>
          <div class='col-3' v-on:click='Titleshow = !Titleshow'>
            <router-link to='TagsView'>
              <p class='sm-p'>TagsView</p>
            </router-link>
          </div>
          <div class='col-3' v-on:click='Titleshow = !Titleshow'>
            <router-link to='ArtistView'>
              <p class='sm-p'>ArtistView</p>
            </router-link>
          </div>
          <div class='col-3' v-on:click='Titleshow = !Titleshow'>
            <router-link to='PreView'>
              <p class='sm-p'>PreView</p>
            </router-link>
          </div>
        </div>
        <welcome></welcome>
      </div>
    </transition>
    
    <transition :duration='{ enter: 800, leave: 10 }'
    enter-active-class='animated fadeOutDown' 
    leave-active-class='animated fadeOutUp'
    v-on:after-leave='BackshowMain'
    v-on:after-enter='ToshowMain'>
      <div class='title-box-2' v-show='Mainshow'>
        <div class='guide' v-on:click='Mainshow = !Mainshow;'>
          <router-link to='/'>
              <p>Back Home</p>
          </router-link>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </transition>
  </div>
</template>

<script>
import welcome from '../Pages/welcome'

export default {
  name: 'home',
  components: {
    welcome
  },
  data() {
    return {
      Titleshow: false,
      Mainshow: false,
      mainopacity : 0
    }
  },
  methods: {
    afterLeave() {
      this.mainopacity = 0;
      this.Mainshow = true
    },
    BackshowMain(){
      this.Titleshow = true;
      console.log('after-leave');
    },
    ToshowMain(){
      console.log('after-enter');
    }
  },
  mounted () {
    this.Titleshow = true
  },
  computed: {
    Mainopacity (){
      return this.mainopacity;
    }
  },
  watch: {
    $route (to, from) {
      if (
        from.path === '/ObjectCategory' ||
        from.path === '/StoryLine' ||
        (from.path === '/ThemeColor' && to.path === '/')
      ) {
        console.log('path to /');
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.guide p{
    position: absolute;
    top: 10px;
    border-radius: 0px 10px 10px 0px;
    padding: 5px;
    font-size: 20px;
    font-weight: lighter;
    background: #efefef;
    color: white;
    z-index: 10;
}
.guide p:hover{
    box-shadow: 2px 2px 5px #939e9e;
}
.home {
  height:calc(100vh - 22px);
  overflow: hidden;
}
.title-box {
  width: 100%;
  height: auto;
}
.title-box-2{
  width: 100%;
  height: auto;
  animation:myfirst 1s;
}

@keyframes myfirst
{
  from {opacity:0;}
  to {opacity:1;}
}

.welcome-title-1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  /* margin-top: 1rem; */
}
.welcome-title-2 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;
}
.welcome-title-3 {
  padding: 0px 25%;
}

.col-3 {
  width: 32.333333%;
  display: inline-block;
  text-align: center;
  font-size: 1.5rem;
  font-family: Patriciana;
  font-weight: bold;
  cursor: pointer;
}
</style>
