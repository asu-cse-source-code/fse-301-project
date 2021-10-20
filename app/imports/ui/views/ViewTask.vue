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
    <div class="w-100 mt-4">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button
        size="md"
        variant="info"
        class="float-left"
        @click="edit = !edit"
      >
        {{ edit ? "Stop Editing" : "Edit" }}
      </b-button>
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
    };
  },
  methods: {},
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
