<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="center">
          <h1>{{ modalData.title }}</h1>
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-4">
        <b-col>
          <h4>{{ modalData.description }}</h4>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col class="mb-3" md="6" lg="4">
          <b>Due Date:</b> {{ modalData.dueDate }}
        </b-col>
        <b-col class="mb-3" md="6" lg="4">
          <b>Due Time:</b> {{ modalData.dueTime }}
        </b-col>
        <b-col md="6" lg="4">
          <b>Priority:</b> {{ priorities[modalData.priority] }}
        </b-col>
        <b-col v-if="modalData.url" md="6" lg="4">
          <b>Link:</b>
          <a :href="modalData.url" target="_blank">{{ modalData.url }}</a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "TaskModal",
  components: {},
  props: ["modalData"],

  data() {
    return {
      //   showModal: true,
      priorities: ["", "Basic", "Important", "Urgent"],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
