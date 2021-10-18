<template>
  <b-card
    v-if="cardNo <= limit"
    :title="member.name"
    :sub-title="member.title"
    :img-src="member.image"
    :img-alt="member.name"
    img-top
  >
    <b-card-text>
      {{ member.info }}
    </b-card-text>
    <template v-if="member.linkOne" #footer>
      <div class="w-100">
        <b-button
          id="dark-outline"
          size="md"
          variant="outline-dark"
          class="float-left mt-1 mb-3"
          :href="member.linkOne"
        >
          {{ member.linkOneTitle }}
        </b-button>
        <b-button
          v-if="member.linkTwo"
          id="success-outline"
          size="md"
          variant="outline-success"
          class="float-right mt-1 mb-3"
          :href="member.linkTwo"
        >
          {{ member.linkTwoTitle }}
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "AboutCard",
  props: ["member", "cardNo", "limit"],
  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
