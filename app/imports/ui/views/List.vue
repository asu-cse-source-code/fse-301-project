<template>
  <div>
    <h1 class="mt-4 mb-4 center">Your Full To-Do List</h1>
    <b-container>
      <b-row align-h="center" class="mb-2">
        <b-col cols="4">
          <b-button block @click="showModal = !showModal" variant="primary"
            >Add New Task</b-button
          >
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
            <full-table :items="todos" />
          </div>
          <div v-else-if="todosIncomplete.length > 0">
            <full-table :items="todosIncomplete" />
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
import FullTable from "../components/tables/FullTable.vue";
import AddItem from "../components/AddItem.vue";

export default {
  name: "List",
  components: {
    FullTable,
    AddItem,
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
          sort: { due: 1 },
        }
      );
    },
    todosIncomplete() {
      return Todos.find(
        { completed: false },
        {
          sort: { due: 1 },
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
