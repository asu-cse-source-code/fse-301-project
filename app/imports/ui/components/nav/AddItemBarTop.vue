<template>
  <div v-if="currentUser">
    <div class="top-left">
      <router-link :to="'/create'" custom v-slot="{ navigate }">
        <b-button
          variant="primary"
          @click="navigate"
          @keypress.enter="navigate"
          squared
          ><i class="fas fa-plus"></i
        ></b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddItemBar",
  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped>
.top-left {
  position: fixed;
  top: 75px;
  left: 20px;
}
</style>
