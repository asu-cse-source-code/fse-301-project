<template>
  <div id="chart">
    <TrendChart
      :datasets="datasets"
      :grid="{
        verticalLines: true,
        horizontalLines: true,
      }"
      :labels="labels"
      :min="0"
    >
    </TrendChart>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["labels", "datasets"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
