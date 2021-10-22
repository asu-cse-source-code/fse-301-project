<template>
  <div>
    <b-row align-h="center" class="mb-2">
      <b-col cols="2">
        <b-button block variant="outline-info" @click="activeView = 'day'"
          >Day</b-button
        >
      </b-col>
      <b-col cols="2">
        <b-button block variant="outline-info" @click="activeView = 'week'"
          >Week</b-button
        >
      </b-col>
      <b-col cols="2">
        <b-button block variant="outline-info" @click="activeView = 'month'"
          >Month</b-button
        >
      </b-col>
      <b-col cols="2">
        <b-button block variant="outline-info" @click="activeView = 'year'"
          >Year</b-button
        >
      </b-col>
      <b-col cols="2">
        <b-button block variant="outline-info" @click="activeView = 'years'"
          >Years</b-button
        >
      </b-col>
    </b-row>

    <b-row align-h="center" class="mb-4">
      <b-col cols="3">
        <b-button block variant="info" @click="$refs.vuecal.previous()"
          ><b-icon-arrow-left></b-icon-arrow-left> Previous</b-button
        >
      </b-col>
      <b-col cols="1"></b-col>
      <b-col cols="3">
        <b-button
          block
          variant="info"
          @click="$refs.vuecal.switchView('day', new Date())"
          ><b-icon-bullseye></b-icon-bullseye> Today</b-button
        >
      </b-col>
      <b-col cols="1"></b-col>
      <b-col cols="3">
        <b-button block variant="info" @click="$refs.vuecal.next()"
          >Next <b-icon-arrow-right></b-icon-arrow-right
        ></b-button>
      </b-col>
    </b-row>
    <div v-if="todoEvents !== null">
      <vue-cal
        class="vuecal--blue-theme"
        :active-view.sync="activeView"
        ref="vuecal"
        :time="false"
        hide-view-selector
        :selected-date="selectedDate"
        events-on-month-view="short"
        :events="events"
        :on-event-click="onEventClick"
        style="height: 600px"
      >
        >
        <!-- <template v-slot:cell-content="{ cell, view, events, goNarrower }">
          <span
            class="vuecal__cell-date"
            :class="view.id"
            v-if="view.id === 'day'"
            @click="goNarrower"
          >
            {{ cell.date }}
          </span>
          <span
            class="vuecal__cell-events-count"
            v-if="view.id === 'month' && events.length"
            >{{ events.length }}Tasks to do 👌</span
          >
          <span
            class="vuecal__no-event"
            v-if="['week', 'day'].includes(view.id) && !events.length"
            >Nothing here 👌</span
          >
        </template> -->
      </vue-cal>
    </div>
    <div v-if="showDialog">
      <b-modal
        v-model="showDialog"
        :title="selectedEvent.username"
        size="lg"
        scrollable
        header-bg-variant="secondary"
        body-bg-variant="light"
        body-text-variant="dark"
        footer-bg-variant="dark"
        backdrop
      >
        <task-modal v-if="!edit" :modalData="selectedEvent"></task-modal>
        <add-item
          v-if="edit"
          :inputForm="selectedEvent"
          :editing="true"
        ></add-item>
        <template v-slot:modal-footer="{ close }">
          <!-- Button with custom close trigger value -->
          <div class="w-100">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button
              size="md"
              variant="info"
              class="float-left"
              @click="goToEdit(selectedEvent)"
            >
              Edit
            </b-button>
            <b-button
              id="danger"
              size="md"
              variant="light"
              class="float-right"
              @click="close()"
            >
              Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <!-- <pre>{{ todoEvents }}</pre> -->
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import TaskModal from "../TaskModal.vue";

export default {
  props: ["events"],
  components: { VueCal, TaskModal },
  data() {
    return {
      activeView: "week",
      selectedDate: null,
      showDialog: false,
      selectedEvent: null,
      todoEvents: null,
      edit: false,
    };
  },
  methods: {
    formatEvents(allEvents) {
      let todo = [];
      for (var event in allEvents) {
        const eventObj = allEvents[event];
        eventObj.start = new Date(eventObj.due);
        eventObj.end = new Date(eventObj.due);
        eventObj.class = "sport";
        eventObj.content = eventObj.description;
        if (eventObj.content.length > 10)
          eventObj.content = eventObj.content.substring(0, 25) + " ...";
        eventObj.contentFull = eventObj.description;
        todo.push(eventObj);
      }
      console.log(todo);
      this.todoEvents = todo;
    },
    onEventClick(event, e) {
      console.log("Event clicked");
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    goToEdit(record) {
      this.$router.push({ name: "Task", params: { taskId: record._id } });
    },
  },
  created() {
    const self = this;
    self.formatEvents(self.events);
  },
};
</script>

<style>
.vuecal__event.sport {
  background-color: rgba(89, 221, 159, 0.9);
  border: 1px solid rgb(76, 190, 137);
  color: #fff;
  margin-top: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.vuecal__event.sport:hover {
  cursor: pointer;
  background-color: rgba(20, 129, 78, 0.7);
}
</style>
