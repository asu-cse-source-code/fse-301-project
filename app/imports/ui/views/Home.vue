<template>
  <div class="mt-4 mb-4">
    <!-- <h1 class="mt-4 mb-4 center">Your Planner</h1> -->
    <b-row class="d-block d-md-none">
      <b-col cols="12">
        <sun />
      </b-col>
    </b-row>
    <b-row class="mt-4 mb-4" align-h="center">
      <b-col md="8" sm="12">
        <greeting />
        <!-- <b-col sm="0" md="2"></b-col> -->
        <task-view></task-view>
      </b-col>
      <b-col class="d-none d-md-block" cols="4">
        <sun />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AddItem from "../components/AddItem.vue";
import Sun from "../components/home/Sun.vue";
import Greeting from "../components/home/Greeting.vue";
import TaskView from "../components/home/TaskView.vue";

export default {
  components: {
    AddItem,
    Sun,
    Greeting,
    TaskView,
  },
  data() {},
};
</script>
