<template>
  <b-container>
    <div v-if="todosIncomplete !== undefined && todosIncomplete.length > 0">
      <fancy-calendar :events="todosIncomplete"></fancy-calendar>
    </div>
  </b-container>
</template>

<script>
import Todos from "../../api/collections/Todo";
// import TaskModal from "../components/TaskModal.vue";
// import AddItem from "../components/AddItem.vue";
import FancyCalendar from "../components/calendar/FancyCalendar.vue";

export default {
  name: "Calendar",
  components: {
    // TaskModal,
    // AddItem,
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
