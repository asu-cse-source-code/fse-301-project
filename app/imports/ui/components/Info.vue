<template>
  <div>
    <h2 class="mt-4 mb-4">Learn Meteor!</h2>
    <b-container>
      <add-item class="mb-3" />
    </b-container>
    <b-card>
      <div v-if="todos && todos.length > 0">
        <b-table striped hover bordered :items="todos" :fields="fields" />
      </div>
      <div v-else>You have no incomplete tasks :)</div>
    </b-card>
  </div>
</template>

<script>
import Todos from "../../api/collections/Todo";
import AddItem from "./AddItem.vue";

export default {
  components: {
    AddItem,
  },
  data() {
    return {
      fields: ["title", "description", "dueDate"],
    };
  },
  meteor: {
    $subscribe: {
      todos: [],
    },
    todos() {
      return Todos.find({});
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

<style scoped>
ul {
  font-family: monospace;
}
</style>
