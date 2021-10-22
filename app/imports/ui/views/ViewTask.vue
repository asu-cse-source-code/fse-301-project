<template>
  <b-container class="mt-3">
    <div v-if="edit">
      <h1 class="center mt-4 mb-4">
        {{
          todos !== null && todos !== undefined ? todos.title : "Loading Task"
        }}
      </h1>
    </div>
    <div v-if="todos && edit">
      <add-item :inputForm="todos"></add-item>
    </div>
    <div class="mt-5" v-else-if="todos && !edit">
      <task-modal :modalData="todos"></task-modal>
    </div>
    <div v-if="!removed" class="w-100 mt-4">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button
        size="md"
        variant="info"
        class="float-left"
        @click="edit = !edit"
      >
        {{ edit ? "Stop Editing" : "Edit" }}
      </b-button>

      <b-button
        :variant="`outline-danger`"
        size="md"
        class="float-right"
        square
        v-b-tooltip.hover
        title="WARNING: Can't be undone!"
        @click="removeTask(todos)"
      >
        <i class="far fa-trash-alt fa-lg"></i>
      </b-button>
    </div>
    <div v-else>
      <b-row align-h="center" class="mb-2">
        <b-col cols="8">
          <span>Your task was successfully removed!</span>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mt-5">
        <b-col cols="4">
          <b-button variant="outline-primary" @click="goToHome()">
            Home
          </b-button>
        </b-col>
        <b-col cols="4">
          <b-button variant="outline-primary" @click="goToList()">
            All Tasks
          </b-button>
        </b-col>
        <b-col cols="4">
          <b-button variant="outline-primary" @click="goToCreate()">
            Create Task
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AddItem from "../components/AddItem.vue";
import TaskModal from "../components/TaskModal.vue";
import Todos from "../../api/collections/Todo";

export default {
  name: "Fse301ProjectViewTask",
  props: ["taskId"],
  components: {
    AddItem,
    TaskModal,
  },

  data() {
    return {
      edit: true,
      removed: false,
    };
  },
  methods: {
    removeTask(data) {
      const self = this;

      Meteor.call("removeTodo", data._id, (error, res) => {
        if (error) {
          alert(error.error);
        } else {
          if (res !== 1) {
            alert(`There was an error attempting to remove your task`);
          } else {
            self.edit = false;
            self.removed = true;
          }
        }
      });
    },
    goToHome() {
      this.$router.push({ name: "Home" });
    },
    goToCreate() {
      this.$router.push({ name: "Create" });
    },
    goToList() {
      this.$router.push({ name: "List" });
    },
  },
  meteor: {
    $subscribe: {
      todos: [],
    },
    todos() {
      return Todos.findOne(this.taskId);
    },
  },
};
</script>
