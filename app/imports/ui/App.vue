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
#nav {
  padding: 30px;

  font-weight: bold;
}
.fluid-container {
  /* background-color: #ebeced; */
  font-family: sans-serif;
  /* background-color: #315481; */
  /* background-image: linear-gradient(to bottom, #3f5d85, #888c92 100%); */
  /* background-attachment: fixed; */
}
.center {
  text-align: center;
}
#dropdowns {
  margin-top: 2rem;
}
</style>
