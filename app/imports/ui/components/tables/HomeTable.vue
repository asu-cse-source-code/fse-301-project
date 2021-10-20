<template>
  <div v-if="!currentUser">
    <!-- <h2 class="center mb-4">Simple Todo List to Get You Started!</h2> -->
    <b-table
      class="hover"
      hover
      bordered
      responsive="lg"
      thead-class="no-hover"
      :items="starterData"
      :fields="fields"
      @row-clicked="myRowClickHandler"
    >
    </b-table>
  </div>
  <div v-else>
    <b-table
      class="hover"
      hover
      bordered
      responsive="lg"
      per-page="1"
      :sort-by.sync="sortBy"
      sort-desc.sync="true"
      thead-class="no-hover"
      :items="items"
      :fields="fields2"
      :tbody-tr-class="rowClass"
      @row-clicked="myRowClickHandler2"
    >
      <template v-slot:cell(completed)="row">
        <b-button
          :variant="row.item.completed ? 'danger' : 'success'"
          pill
          block
          @click="markComplete(row.item)"
        >
          {{ row.item.completed ? "Mark Incomplete" : "Mark Complete" }}
        </b-button>
      </template>
      <template v-slot:cell(remove)="row">
        <div class="center">
          <b-button
            :variant="`outline-${priorityColor[row.item.priority]}`"
            square
            block
            v-b-tooltip.hover
            title="WARNING: Can't be undone!"
            @click="removeTask(row.item)"
          >
            <i class="far fa-trash-alt fa-lg"></i>
          </b-button>
        </div>
      </template>
      <template v-slot:cell(dueDate)="row">
        <div
          v-for="time in getRemaining(new Date(), row.item.dueDate)"
          :key="time.difference"
        >
          <div>
            <span v-if="time.overDue" style="font-weight: bold; color: red"
              >OVER DUE:
            </span>
            {{ time.difference }}
          </div>
        </div>
      </template>
    </b-table>
    <div v-if="showModal">
      <b-modal
        v-model="showModal"
        :title="modalData.username"
        size="lg"
        scrollable
        header-bg-variant="secondary"
        body-bg-variant="light"
        body-text-variant="dark"
        footer-bg-variant="dark"
        backdrop
      >
        <task-modal :modalData="modalData"></task-modal>
        <template v-slot:modal-footer="{ close }">
          <!-- Button with custom close trigger value -->
          <div class="w-100">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button
              size="md"
              variant="info"
              class="float-left"
              @click="edit = !edit"
            >
              Edit
            </b-button>
            <b-button
              id="danger"
              size="md"
              variant="light"
              class="float-right"
              @click="close()"
            >
              Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import TaskModal from "../TaskModal.vue";
const timeDif = require("../../../api/helper/timeRemaining.js");
import starterData from "../json/starter-data.json";

export default {
  name: "HomeTable",
  props: ["items"],
  components: {
    TaskModal,
  },

  data() {
    return {
      sortBy: "dueDate",
      starterData: starterData,
      fields: ["title", "description"],
      fields2: [
        "title",
        "description",
        "priority",
        { key: "dueDate", label: "Time Left" },
        "completed",
        "remove",
      ],
      priorityColor: ["light", "secondary", "info", "danger"],
      showModal: false,
      modalData: null,
      dueDate: null,
      count: 0,
    };
  },

  mounted() {},

  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      return `table-${this.priorityColor[item.priority]}`;
    },
    myRowClickHandler(record, _index) {
      if (record.url === "/login") {
        this.$router.push(record.url + "/login");
      } else if (record.url === "/create-acct") {
        this.$router.push("login/create");
      } else {
        window.open(record.url, "_blank");
      }
    },
    myRowClickHandler2(record, _index) {
      this.modalData = record;
      this.showModal = true;
    },
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
    removeTask(data) {
      Meteor.call("removeTodo", data._id, (error, res) => {
        if (error) {
          alert(error.error);
        } else {
          if (res !== 1) {
            alert(`There was an error attempting to remove your task`);
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
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
