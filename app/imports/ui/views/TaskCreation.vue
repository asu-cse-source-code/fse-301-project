<template>
  <b-container>
    <h1 class="center mt-4 mb-4">Create To-Do</h1>
    <add-item></add-item>
  </b-container>
</template>

<script>
import AddItem from "../components/AddItem.vue";

export default {
  name: "Fse301ProjectTaskcreation",
  props: ["modalData"],
  components: {
    AddItem,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
