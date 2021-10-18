<template>
  <b-container>
    <b-calendar block @context="onContext" locale="en-US"></b-calendar>
    <br />
    <br />
    <!-- <pre>{{ context }}</pre> -->
    <h4 v-if="context && context.activeDate">
      {{ context.activeDate.toDateString() }}
    </h4>
    <br /><br /><br />
    <div class="third-height">
      <b-row
        align-h="center"
        class="mb-4"
        v-for="todo in todosIncomplete"
        :key="todo.title"
      >
        <b-col
          cols="10"
          v-if="context && checkDates(todo.due, context.activeDate)"
        >
          <h3>
            <li>
              <b-badge
                @click="displayTodo(todo)"
                class="hover"
                :variant="badgeColors[todo.priority]"
                >{{ todo.title }}</b-badge
              >
            </li>
          </h3>
        </b-col>
      </b-row>
    </div>
    <div v-if="modalData">
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
        <template v-slot:modal-footer>
          <!-- Button with custom close trigger value -->
          <div class="w-100">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button
              v-if="!edit"
              size="md"
              variant="info"
              class="float-left"
              @click="edit = !edit"
            >
              Edit
            </b-button>
            <b-button
              v-if="edit"
              size="md"
              variant="info"
              class="float-left"
              @click="edit = !edit"
            >
              Cancel
            </b-button>

            <b-button
              size="md"
              variant="success"
              class="float-right"
              @click="markComplete(modalData)"
            >
              Completed
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import Todos from "../../api/collections/Todo";
import TaskModal from "../components/TaskModal.vue";
import AddItem from "../components/AddItem.vue";

export default {
  name: "Calendar",
  components: {
    TaskModal,
    AddItem,
  },

  data() {
    return {
      context: null,
      modalData: null,
      showModal: false,
      edit: false,
      badgeColors: ["light", "secondary", "info", "danger"],
      count: 0,
    };
  },

  mounted() {},
  meteor: {
    $subscribe: {
      todosIncomplete: [],
    },
    todosIncomplete() {
      return Todos.find({ completed: false });
    },
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    checkDates(due, date) {
      due = new Date(due);
      return due.toDateString() === date.toDateString();
    },
    displayTodo(todo) {
      this.modalData = todo;
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
            self.showModal = false;
          }
        }
      });
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
