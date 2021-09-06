<template>
  <div>
    <h2 class="mt-4 mb-4">Learn Meteor!</h2>
    <b-container>
      <add-item class="mb-3" />
    </b-container>
    <b-card>
      <b-table striped hover bordered :items="todos" :fields="fields" />
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
      fields: ["title", "description", "date"],
    };
  },
  meteor: {
    $subscribe: {
      todos: [],
    },
    todos() {
      return Todos.find({});
    },
  },
  methods: {},
};
</script>

<style scoped>
ul {
  font-family: monospace;
}
</style>
