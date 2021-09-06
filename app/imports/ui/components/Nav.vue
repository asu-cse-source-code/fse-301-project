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
          <div v-for="(link, i) in links" :key="i">
            <b-nav-item right
              ><router-link :to="link.url" custom v-slot="{ navigate }">
                <span
                  class="active-link"
                  v-if="$route.name === link.routeName"
                  >{{ link.title }}</span
                >
                <span
                  v-else
                  @click="navigate"
                  @keypress.enter="navigate"
                  role="link"
                  >{{ link.title }}</span
                >
              </router-link></b-nav-item
            >
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "Nav",
  components: {},

  directives: {},

  data() {
    return {
      links: [
        { title: "Home", url: "/", routeName: "Home" },
        { title: "About", url: "/about", routeName: "About" },
        { title: "Calendar", url: "/calendar", routeName: "Calendar" },
        { title: "Todo", url: "/full-list/", routeName: "List" },
        { title: "Login", url: "/login", routeName: "Login" },
      ],
    };
  },

  mounted() {},

  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },

  methods: {
    getListUrl() {
      let url = null;
      if (this.currentUser) {
        url = "/full-list/" + this.getUsername();
      }
      return url;
    },
    getUsername() {
      return this.currentUser?.username;
    },
  },
};
</script>

<style>
.active-link {
  color: white;
}
.active-link:hover {
  cursor: not-allowed !important;
}
</style>
