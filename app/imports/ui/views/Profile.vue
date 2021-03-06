<template>
  <div>
    <h1 class="mt-4 mb-4 center">{{ getUsername() }}</h1>
    <br />
    <br />
    <b-container>
      <h3 class="mt-3 mb-3 center"><b>Your Rewards and Stats</b></h3>
      <b-row align-h="center" class="center mb-5">
        <b-col sm="6" md="4" lg="2">
          <b-button block variant="info" @click="copyToClipboard()">
            SHARE
          </b-button>
        </b-col>
      </b-row>
      <b-row class="left">
        <b-col md="6" sm="12" v-if="rewardsObj">
          <ul>
            <li><strong>Total Points:</strong> {{ rewardsObj.points }}</li>
          </ul>
          <ul>
            <li v-if="rewardsObj.streak >= 0">
              <strong>Current Streak of Tasks Completed on Time:</strong>
              {{ rewardsObj.streak }}
            </li>
            <li v-else>
              <strong>Current Streak of Tasks Completed on Time:</strong>
              0
            </li>
          </ul>
          <ul>
            <li>
              <strong>Longest Streak:</strong>
              {{ rewardsObj.longestPositiveStreak }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Current Usage Streak:</strong> {{ rewardsObj.appStreak }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Longest Usage Streak:</strong>
              {{ rewardsObj.longestAppStreak }}
            </li>
          </ul>
        </b-col>
        <b-col md="6" sm="12" v-if="rewardsObj">
          <ul>
            <li>
              <strong>Total Days on App:</strong>
              {{ rewardsObj.daysOnApp.length }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Total Tasks Completed:</strong>
              {{
                rewardsObj.completedOnTime +
                  rewardsObj.completedEarly +
                  rewardsObj.completedLate || 0
              }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Completed Early:</strong>
              {{ rewardsObj.completedEarly || 0 }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Completed On Time:</strong>
              {{ rewardsObj.completedOnTime || 0 }}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Completed Late:</strong>
              {{ rewardsObj.completedLate || 0 }}
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mt-3 mb-3">
      <h4 v-if="dataCount > 0" class="mt-4 mb-4 center">
        Your Rewards Progress
      </h4>
      <div v-if="dataCount > 3">
        <rewards-graph
          :series="series"
          :chartOptions="chartOptions"
        ></rewards-graph>
      </div>
      <div class="mt-5" v-if="dataCount > 0">
        <rewards-bar
          :series="seriesBar"
          :chartOptions="chartOptionsBar"
        ></rewards-bar>
      </div>
    </b-container>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import RewardsGraph from "../components/graph/RewardsGraph.vue";
import RewardsBar from "../components/graph/RewardsBar.vue";
import lineOptions from "../components/graph/chart-data/line-options.json";
import barOptions from "../components/graph/chart-data/bar-options.json";

export default {
  name: "Fse301PlannerProfile",
  props: ["id"],
  components: { RewardsGraph, RewardsBar },

  data() {
    return {
      rewardsObj: null,
      chartOptions: lineOptions,
      series: null,
      chartOptionsBar: barOptions,
      seriesBar: null,
      dataCount: 0,
      graphColor: "#28A745",
    };
  },

  mounted() {},

  methods: {
    getUsername() {
      return this.currentUser?.username;
    },
    async copyToClipboard() {
      let urlToCopy =
        window.location.href ||
        `https://planner.austinbspencer.com/#/user/${this.id}`;

      try {
        await navigator.clipboard.writeText(urlToCopy);
        alert("Your unique profile url was copied successfully");
      } catch (err) {
        alert("Oops, unable to copy!", err);
      }
    },
    createProfitChart() {
      const object = this.rewardsObj.pointsObj;
      const beginningDate = new Date(this.rewardsObj.createdAt);
      // const object = {
      //   "Fri Oct 22 2021": 345,
      //   "Thu Oct 21 2021": 30,
      //   "Wed Oct 20 2021": 50,
      //   "Tue Oct 19 2021": 100,
      // };

      let count = 0;
      let total = 0;

      let data = [];
      let barData = [];
      let dates = [];
      let barDates = [];

      const year = beginningDate.getFullYear().toString().slice(2, 4);
      const month = beginningDate.getMonth();
      const day = beginningDate.getDate();
      const formatDate = `${month + 1}-${day}-${year}`;

      data.push(0);
      dates.push(formatDate);

      for (const date in object) {
        total = object[date] + total;
        data.push(total);
        barData.push(object[date]);
        const dateObj = new Date(date);
        barDates.push(dateObj.toDateString().slice(4, 16));
        const year = dateObj.getFullYear().toString().slice(2, 4);
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const formatDate = `${month + 1}-${day}-${year}`;
        dates.push(formatDate);
        count++;
      }

      this.series = [
        {
          name: "Total Points",
          data: data,
        },
      ];

      this.seriesBar = [
        {
          name: "Points",
          data: barData,
        },
      ];

      this.chartOptions.xaxis.categories = dates;
      this.chartOptions.colors.push(this.graphColor);

      this.chartOptionsBar.xaxis.categories = barDates;

      this.dataCount = count;
    },
  },
  created() {
    const self = this;
    Meteor.call("getRewards", this.id, (error, res) => {
      if (error) {
        alert(error.error);
      } else {
        self.rewardsObj = res;
        self.createProfitChart();
      }
    });
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped></style>
