<template>
  <b-container class="mt-5">
    <h1 class="mt-3 mb-3 center"><b>Top Users</b></h1>
    <div v-for="(user, idx) in rewardData" :key="idx">
      <div v-if="idx < 3">
        <b-row class="left mb-2">
          <b-col cols="2"> {{ idx + 1 }}. </b-col>
          <b-col cols="10">
            <b>{{ user.username }}</b>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Fse301ProjectTopusers",

  props: ["rewardData"],

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
