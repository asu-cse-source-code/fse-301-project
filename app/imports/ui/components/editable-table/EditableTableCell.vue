<template>
  <div id="app">
    <b-table
      class="hover"
      hover
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      responsive="lg"
      thead-class="no-hover"
      @row-clicked="myRowClickHandler2"
    >
      <template #cell(priority)="data">
        <b-form-select
          v-if="items[data.index].isEdit && selectedCell === 'priority'"
          v-model="items[data.index].priority"
          :options="getPriorityOptions(data.index)"
        ></b-form-select>
        <b-button
          variant="outline-secondary"
          v-else
          @click="editCellHandler(data, 'priority')"
          >{{ data.value }}</b-button
        >
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
      <template #cell(_id)="data">
        <div v-if="isEdited(data)">
          <b-button variant="outline-success" @click="saveChanges(data)"
            >Save</b-button
          >
        </div>
      </template>
      <template v-slot:cell(completed)="row">
        <b-button
          :variant="row.item.completed ? 'danger' : 'success'"
          pill
          block
          @click="markComplete(row.item)"
        >
          {{ row.item.completed ? "Incomplete" : "Complete" }}
        </b-button>
      </template>
      <template v-slot:cell(remove)="row">
        <div class="center">
          <b-button
            :variant="`outline-danger`"
            size="sm"
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
              @click="goToEdit(modalData)"
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
    <!-- <pre>{{ items }}</pre> -->
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import TaskModal from "../TaskModal.vue";
import AddItem from "../AddItem.vue";
const timeDif = require("../../../api/helper/timeRemaining.js");

export default {
  name: "App",
  props: ["todos"],
  components: {
    TaskModal,
    AddItem,
  },
  data() {
    return {
      sortBy: "priority",
      newVal: false,
      sortedTodos: null,
      showModal: false,
      modalData: null,
      edit: false,
      fields: [
        "priority",
        "title",
        // "description",
        { key: "dueDate", label: "Time Left" },
        { key: "completed", label: "Status" },
        "remove",
        { key: "_id", label: "" },
      ],
      items: this.todos,
      selectedCell: null,
    };
  },
  mounted() {
    this.items = this.items.map((item) => ({ ...item, isEdit: false }));
  },
  methods: {
    editCellHandler(data, name) {
      this.items = this.items.map((item) => ({ ...item, isEdit: false }));
      this.items[data.index].isEdit = true;
      this.selectedCell = name;
      this.items[data.index].og = this.items[data.index][name];
    },
    sortTodos(todos) {
      const sortedData = todos.sort(function (a, b) {
        // to get a value that is either negative, positive, or zero.
        return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0;
      });
      return sortedData;
    },
    isEdited(data, _id) {
      if (
        this.items[data.index].og === null ||
        this.items[data.index].og === undefined
      )
        return false;
      return (
        this.items[data.index].og !== this.items[data.index][this.selectedCell]
      );
    },
    getPriorityOptions() {
      let options = [];
      for (var i = 1; i <= this.todos.length; i++) {
        options.push({ value: i, text: i });
      }
      return options;
    },
    saveChanges(data) {
      const taskId = this.items[data.index]._id;
      const oldPriority = this.items[data.index].og;
      const newPriority = this.items[data.index].priority;

      Meteor.call(
        "updatePriority",
        newPriority,
        oldPriority,
        taskId,
        (error, _res) => {
          if (error) {
            alert(error.error);
          } else {
            alert("Successfully updated your task!");
          }
        }
      );
    },
    markComplete(data) {
      Meteor.call("completeTodo", data._id, !data.completed, (error, res) => {
        if (error) {
          alert(error.error);
        } else {
          if (res > 0) {
            alert(`Nice Job! You just received ${res} points!`);
          }
        }
      });
    },
    removeTask(data) {
      console.log("Removing item");
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
    myRowClickHandler2(record, _index) {
      this.modalData = record;
      this.showModal = true;
    },
    getRemaining(date1, dueDate) {
      // console.log(`date1: ${date1} vs due: ${dueDate}`);
      const timedif = timeDif.difference(date1, dueDate);
      // console.log(timedif);
      return timedif;
    },
    goToEdit(record) {
      this.$router.push({ name: "Task", params: { taskId: record._id } });
    },
  },
  created() {
    const self = this;
    self.items = self.sortTodos(self.todos);
    self.sortedTodos = self.sortTodos(self.todos);
  },
  watch: {
    todos: function (newVal, oldVal) {
      // console.log("newVal: ", newVal);
      this.items = newVal;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 60px;
}
thead,
tbody,
tfoot,
tr,
td,
th {
  text-align: left;
  width: 100px;
  vertical-align: middle;
}
pre {
  text-align: left;
  color: #d63384;
}
</style>
