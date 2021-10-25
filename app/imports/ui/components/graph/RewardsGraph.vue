<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["series", "chartOptions"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
