<template>
  <div v-if="currentUser">
    <div class="bottom-right">
      <b-button variant="primary" @click="showModal = !showModal" squared
        ><i class="fas fa-plus"></i
      ></b-button>
    </div>
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
  </div>
</template>

<script>
import AddItem from "../AddItem.vue";

export default {
  name: "AddItemBar",
  components: {
    AddItem,
  },

  data() {
    return {
      showModal: false,
    };
  },

  mounted() {},

  methods: {},
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 30px;
}
</style>
