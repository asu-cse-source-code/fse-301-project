<template>
  <b-card
    :border-variant="feature.bg"
    :header="feature.title"
    :header-bg-variant="feature.bg"
    :header-text-variant="feature.text"
    align="center"
    class="text-center mb-4"
  >
    <b-card-text>{{ feature.description }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "FeatureCard",
  props: ["feature"],
  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
