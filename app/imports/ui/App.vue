<template>
  <div class="fluid-container">
    <div id="nav">
      <nav-bar />
    </div>
    <div id="app" style="min-height: 60vh">
      <router-view></router-view>
    </div>
    <!-- <div id="footer">
      <custom-footer></custom-footer>
    </div> -->
  </div>
</template>

<script>
import NavBar from "./components/Nav.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>
