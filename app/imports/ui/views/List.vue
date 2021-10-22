<template>
  <div>
    <h1 class="mt-4 mb-4 center">Your Full To-Do List</h1>
    <b-container>
      <b-row align-h="center" class="mb-2">
        <b-col cols="4">
          <router-link :to="'/create'" custom v-slot="{ navigate }">
            <b-button
              block
              variant="primary"
              @click="navigate"
              @keypress.enter="navigate"
              squared
              >New Task</b-button
            >
          </router-link>
        </b-col>
      </b-row>
      <b-modal
        v-model="showModal"
        title="Add New Task"
        size="lg"
        scrollable
        header-bg-variant="secondary"
        body-bg-variant="light"
        body-text-variant="dark"
        footer-bg-variant="dark"
        backdrop
      >
        <add-item></add-item>
        <template v-slot:modal-footer="{ close }">
          <!-- Button with custom close trigger value -->
          <div class="w-100">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button
              id="danger"
              size="md"
              variant="light"
              class="float-right"
              @click="close()"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
    </b-container>
    <b-card class="mt-5" bg-variant="dark">
      <div v-if="todos && todos.length > 0">
        <b-card>
          <b-row>
            <b-col sm="12" md="8">
              <h2 class="mb-4">
                You have <b>{{ todosIncomplete.length }}</b> tasks left to
                complete.
              </h2>
            </b-col>
            <b-col sm="6" md="4" v-if="todos.length > todosIncomplete.length">
              <b-button @click="showCompleted = !showCompleted">
                <div>
                  {{
                    showCompleted
                      ? "Hide Completed Tasks"
                      : "Show Completed Tasks"
                  }}
                </div>
              </b-button>
            </b-col>
          </b-row>

          <div v-if="showCompleted && todos.length > 0">
            <editable-table-cell :todos="todos" />
          </div>
          <div v-else-if="todosIncomplete.length > 0">
            <editable-table-cell :todos="todosIncomplete" />
          </div>
        </b-card>
      </div>
      <div v-else>
        <b-card class="center">
          <h3>You have no incomplete tasks :)</h3>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
import Todos from "../../api/collections/Todo";
import AddItem from "../components/AddItem.vue";
import EditableTableCell from "../components/editable-table/EditableTableCell.vue";

export default {
  name: "List",
  components: {
    AddItem,
    EditableTableCell,
  },

  data() {
    return {
      showCompleted: false,
      showModal: false,
    };
  },

  mounted() {},
  meteor: {
    $subscribe: {
      todos: [],
      todosIncomplete: [],
    },
    todos() {
      return Todos.find(
        {},
        {
          sort: { priority: 1 },
        }
      );
    },
    todosIncomplete() {
      return Todos.find(
        { completed: false },
        {
          sort: { priority: 1 },
        }
      );
    },
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    getUsername() {
      return this.currentUser?.username;
    },
  },
};
</script>
