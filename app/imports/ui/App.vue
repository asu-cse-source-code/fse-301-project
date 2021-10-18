<template>
  <div class="fluid-container">
    <div id="nav">
      <nav-bar />
    </div>
    <div id="app" class="sixty-height">
      <router-view></router-view>
    </div>
    <div id="nav">
      <add-item-bar-top />
      <!-- <add-item /> -->
    </div>
    <div id="footer">
      <custom-footer></custom-footer>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/nav/Nav.vue";
import CustomFooter from "./components/Footer.vue";
// import AddItem from "./components/nav/AddItemBar.vue";
import AddItemBarTop from "./components/nav/AddItemBarTop.vue";

export default {
  components: {
    NavBar,
    CustomFooter,
    // AddItem,
    AddItemBarTop,
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
.right {
  text-align: right;
}
#dropdowns {
  margin-top: 2rem;
}
.quarter-height {
  min-height: 25vh;
}
.third-height {
  min-height: 33vh;
}
.half-height {
  min-height: 50vh;
}
.sixty-height {
  min-height: 60vh;
}
.threeQ-height {
  min-height: 75vh;
}
.hover:hover {
  cursor: pointer;
}
.hidden_header {
  display: none;
}
.trash {
  color: black;
}
.trash:hover {
  color: red;
}
.no-hover:hover {
  cursor: default !important;
}
.no-border {
  border: none;
}
.card-title {
  text-align: center;
}
.white {
  color: white;
}
</style>
