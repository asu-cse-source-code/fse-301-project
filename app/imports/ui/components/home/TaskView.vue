<template>
  <b-row align-h="start" class="mt-5 mb-5">
    <b-col class="d-none d-sm-block" sm="3">
      <b-img class="no-border" thumbnail fluid src="/images/arrow.png"></b-img>
    </b-col>
    <b-col sm="8" md="6">
      <div v-if="!currentUser">
        <home-table class="mt-5" :items="todosIncomplete" />
      </div>
      <div v-else-if="todos && todos.length > 0">
        <home-card :task="todos[0]" />
      </div>
      <div v-else>
        <b-card class="center">
          <h3 class="pb-5">You have no incomplete tasks :)</h3>
          <div class="top-left">
            <router-link :to="'/create'" custom v-slot="{ navigate }">
              <b-button
                variant="primary"
                @click="navigate"
                @keypress.enter="navigate"
                squared
                >New Task</b-button
              >
            </router-link>
          </div>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Todos from "../../../api/collections/Todo";
import HomeTable from "../tables/HomeTable.vue";
import HomeCard from "../feature-cards/HomeCard.vue";
import AddItem from "../AddItem.vue";

export default {
  components: {
    HomeTable,
    HomeCard,
    AddItem,
  },
  data() {
    return {
      showModal: false,
    };
  },
  meteor: {
    $subscribe: {
      todosIncomplete: [],
      todos: [],
    },
    todosIncomplete() {
      return Todos.find({});
    },
    todos() {
      return Todos.find(
        {
          username: this.getUsername(),
          completed: false,
        },
        {
          sort: { due: 1 },
          limit: 1,
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
