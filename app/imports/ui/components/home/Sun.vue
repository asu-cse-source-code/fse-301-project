<template>
  <div>
    <b-card
      class="no-border"
      overlay
      img-src="/images/sun-smaller.png"
      style="max-width: 20rem"
      img-height="400"
      img-alt="Card Image"
    >
      <div class="center-center">
        <span class="center-center" style="font-weight: bold">{{ today }}</span>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Fse301PlannerSun",

  data() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "-" + dd + "-" + yyyy;
    return {
      today: today,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
ul {
  font-family: monospace;
}
div.center-center {
  height: 400px;
  line-height: 355px;
  text-align: center;
  /* border: 2px dashed #f69c55; */
}
span.center-center {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
</style>
