<template>
  <b-container>
    <div v-if="todosIncomplete !== undefined && todosIncomplete.length > 0">
      <fancy-calendar :events="todosIncomplete"></fancy-calendar>
    </div>
    <div v-else>
      <h1 class="mt-5">Your calendar is empty! <br /></h1>
      <h4>
        <b>Create some tasks to view them here!</b>
      </h4>
      <fancy-calendar :events="[]"></fancy-calendar>
    </div>
  </b-container>
</template>

<script>
import Todos from "../../api/collections/Todo";
import FancyCalendar from "../components/calendar/FancyCalendar.vue";

export default {
  name: "Calendar",
  components: {
    FancyCalendar,
  },

  data() {
    return {};
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
  methods: {},
};
</script>

<style scoped></style>
