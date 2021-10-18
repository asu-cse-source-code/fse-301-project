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
      <b-row>
        <b-col md="6" sm="12" v-if="rewardsObj">
          <ul>
            <li><strong>Total Points:</strong> {{ rewardsObj.points }}</li>
          </ul>
          <ul>
            <li>
              <strong>Current Streak of Tasks Completed on Time:</strong>
              {{ rewardsObj.streak }}
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
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "Fse301PlannerProfile",
  props: ["id"],
  components: {},

  data() {
    return {
      rewardsObj: null,
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
  },
  created() {
    const self = this;
    Meteor.call("getRewards", this.id, (error, res) => {
      if (error) {
        alert(error.error);
      } else {
        self.rewardsObj = res;
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
