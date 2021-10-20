<template>
  <div>
    <b-table
      class="hover"
      hover
      bordered
      responsive="lg"
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
        <div v-if="!row.item.completed">
          <div
            v-for="time in getRemaining(new Date(), row.item.due)"
            :key="time.difference"
          >
            <div>
              <span
                v-if="time.status === 'Late'"
                style="font-weight: bold; color: red"
                >OVER DUE:
              </span>
              {{ time.difference }}
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <span
              v-if="row.item.status === 'Late'"
              style="font-weight: bold; color: red"
              >{{ row.item.status }}
            </span>
            <span v-else style="font-weight: bold; color: green">
              {{ row.item.status }}
            </span>
            <!-- {{ row.item.timeDifference }} -->
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
        <task-modal v-if="!edit" :modalData="modalData"></task-modal>
        <add-item v-if="edit" :inputForm="modalData" :editing="true"></add-item>
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
import AddItem from "../AddItem.vue";
const timeDif = require("../../../api/helper/timeRemaining.js");

export default {
  name: "HomeTable",
  props: ["items"],
  components: {
    TaskModal,
    AddItem,
  },

  data() {
    return {
      sortBy: "dueDate",
      fields2: [
        "title",
        "description",
        { key: "priority", sortable: true },
        { key: "dueDate", label: "Time Left", sortable: true },
        { key: "completed", label: "Status", sortable: true },
        "remove",
      ],
      priorityColor: ["light", "secondary", "info", "danger"],
      showModal: false,
      modalData: null,
      dueDate: null,
      edit: false,
      count: 0,
    };
  },

  mounted() {},

  methods: {
    display(item) {
      console.log(item);
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      return `table-${this.priorityColor[item.priority]}`;
    },
    myRowClickHandler(record, _index) {
      if (record.url === "") return;
      this.$router.push(record.url);
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
      // console.log(`date1: ${date1} vs due: ${dueDate}`);
      const timedif = timeDif.difference(date1, dueDate);
      // console.log(timedif);
      return timedif;
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
