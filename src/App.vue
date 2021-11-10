<template>
  <div id="app">
    <topnav></topnav>
    <router-view/>
  </div>
</template>

<script>
import topnav from "./components/TopNav.vue";
export default {
  components:{
    topnav
  }
}
</script>

<style>
.el-dialog{
  border-radius: 10px;
}
</style>