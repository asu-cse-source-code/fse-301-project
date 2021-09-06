<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand
        id="brand"
        href="https://www.linkedin.com/in/austin-spencer-b56a25177/"
      >
        PLANNER
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <template v-slot:default="{ expanded }">
          <span v-if="expanded">
            <i class="fas fa-chevron-circle-down"></i
          ></span>
          <span v-else> <i class="fas fa-chevron-circle-up"></i></span>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="$route.name === 'Home'" class="active" right
            >Home</b-nav-item
          >
          <b-nav-item v-if="$route.name !== 'Home'" to="/" right
            >Home</b-nav-item
          >
          <span v-if="$route.name === 'About'" class="active" right>About</span>
          <b-nav-item v-if="$route.name !== 'About'" to="/about" right
            >About</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script></script>

<style>
.active {
  color: white;
}
.active:hover {
  cursor: not-allowed !important;
}
</style>
