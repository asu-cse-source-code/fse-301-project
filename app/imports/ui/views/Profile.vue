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
    <b-container class="mt-3 mb-3" v-if="dataCount > 3">
      <h4 class="mt-4 mb-4 center">Rewards Chart</h4>
      <rewards-graph
        :series="series"
        :chartOptions="chartOptions"
      ></rewards-graph>
    </b-container>
    <div v-if="topRewards !== undefined">
      <top-users :rewardData="topRewards" />
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Rewards from "../../api/collections/Rewards";
import TopUsers from "../components/TopUsers.vue";
import RewardsGraph from "../components/graph/RewardsGraph.vue";

export default {
  name: "Fse301PlannerProfile",
  props: ["id"],
  components: { TopUsers, RewardsGraph },

  data() {
    return {
      rewardsObj: null,
      chartOptions: null,
      series: null,
      dataCount: null,
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
      // const object = {
      //   "Fri Oct 22 2021": 345,
      //   "Thu Oct 21 2021": 30,
      //   "Wed Oct 20 2021": 50,
      //   "Tue Oct 19 2021": 100,
      // };

      let count = 0;
      let total = 0;

      let data = [];
      let dates = [];

      for (const date in object) {
        total = object[date] + total;
        data.push(total);
        const dateObj = new Date(date);
        const year = dateObj.getFullYear().toString().slice(2, 4);
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const formatDate = `${month + 1}-${day}-${year}`;
        dates.push(formatDate);
        count++;
      }

      this.series = [
        {
          name: "Total Profit",
          data: data,
        },
      ];

      this.chartOptions = {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "",
          align: "left",
        },
        grid: {
          row: {
            // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: dates,
          labels: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
        },
        colors: [this.graphColor],
      };
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
    $subscribe: {
      // Subscribes to the 'threads' publication with no parameters
      topRewards: [],
    },
    topRewards() {
      return Rewards.find(
        {},
        {
          sort: { points: -1 },
        },
        { limit: 3 }
      ).fetch();
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped></style>
