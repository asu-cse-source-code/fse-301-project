<template>
  <b-card :title="task.title" header-tag="header" class="mb-2">
    <hr />
    <br />
    <b-card-text class="center">
      <span>{{ task.description }}</span>
      <br /><br />
      <div
        v-for="time in getRemaining(new Date(), task.due)"
        :key="time.difference"
      >
        <div>
          <span
            v-if="time.status === 'Late'"
            style="font-weight: bold; color: red"
            >OVER DUE:
          </span>
          <span v-else style="font-weight: bold; color: green">Goal is: </span>
          {{ time.difference }}
        </div>
      </div>
    </b-card-text>
    <br /><br /><br />
    <hr />
    <b-row>
      <b-col cols="10">
        <b-button variant="success" @click="markComplete(task)"
          >Complete</b-button
        >
      </b-col>
      <b-col v-if="task.url" cols="2">
        <b-button :href="task.url" variant="primary"
          ><i class="fas fa-external-link-alt"></i
        ></b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { Meteor } from "meteor/meteor";
const timeDif = require("../../../api/helper/timeRemaining.js");

export default {
  name: "HomeCard",
  props: ["task"],
  components: {},

  data() {
    return {
      count: 0,
    };
  },

  mounted() {},

  methods: {
    markComplete(data) {
      const self = this;
      Meteor.call("completeTodo", data._id, !data.completed, (error, res) => {
        if (error) {
          alert(error.error);
        } else {
          console.log(res);
          if (res > 0) {
            self.showToast(res);
          }
        }
      });
    },
    getRemaining(date1, dueDate) {
      return timeDif.difference(date1, dueDate);
    },
    showToast(points) {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      this.count++;
      // Create the message
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("h4", {}, `Nice Job! You just received ${points} points!`),
      ]);
      // Create the title
      const vNodesTitle = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
        [
          h("strong", { class: "mr-2" }, " New Rewards!"),
          // h("span", { class: "ml-auto text-italics" }, points),
        ]
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        id: `toasting-${this.count}`,
        toaster: "b-toaster-top-center",
        title: [vNodesTitle],
        solid: true,
        variant: "success",
      });
    },
  },
};
</script>

<style scoped></style>
