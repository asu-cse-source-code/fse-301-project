<template>
  <div>
    <h2>Learn Meteor!</h2>
    <b-card>
      <b-row align-h="end" class="mb-2">
        <b-col cols="8"></b-col>
        <b-col cols="4">
          <b-button block v-b-toggle.collapse-1 variant="primary"
            >Add New Task</b-button
          >
        </b-col>
      </b-row>
      <b-row class="mb-2" align-h="end">
        <b-col>
          <b-collapse id="collapse-1" class="mt-2">
            <add-item></add-item>
          </b-collapse>
        </b-col>
      </b-row>
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
