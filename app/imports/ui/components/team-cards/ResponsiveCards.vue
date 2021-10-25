<template>
  <div>
    <b-row align-h="center">
      <div class="d-none d-xl-block">
        <b-card-group class="mb-4" deck>
          <austin-card />
          <david-card />
          <samantha-card />
          <sydney-card />
        </b-card-group>
      </div>
      <div class="d-none d-md-block d-xl-none">
        <b-card-group class="mb-4" deck>
          <austin-card />
          <david-card />
        </b-card-group>
        <b-card-group class="mb-4" deck>
          <samantha-card />
          <sydney-card />
        </b-card-group>
      </div>
      <b-col sm="12" class="d-block d-md-none">
        <austin-card class="mb-4" />
        <david-card class="mb-4" />
        <samantha-card class="mb-4" />
        <sydney-card class="mb-4" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AustinCard from "./AustinCard.vue";
import DavidCard from "./DavidCard.vue";
import SydneyCard from "./SydneyCard.vue";
import SamanthaCard from "./SamanthaCard.vue";

export default {
  name: "ResponsiveCards",
  props: ["teamMembers"],
  components: {
    AustinCard,
    DavidCard,
    SydneyCard,
    SamanthaCard,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
