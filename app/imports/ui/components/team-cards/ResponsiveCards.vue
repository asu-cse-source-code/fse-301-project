<template>
  <div>
    <b-row align-h="center">
      <b-card-group deck>
        <about-card
          class="d-none d-xl-block"
          v-for="(member, i) in teamMembers"
          :key="member.name"
          :member="member"
          :cardNo="i"
          :limit="100"
        />
      </b-card-group>
      <b-card-group deck>
        <about-card
          class="d-none d-md-block d-xl-none"
          v-for="(member, i) in teamMembers"
          :key="member.name"
          :member="member"
          :cardNo="i"
          :limit="1"
        />
      </b-card-group>
      <b-card-group deck>
        <about-card
          class="d-none d-md-block d-xl-none"
          v-for="(member, i) in teamMembers.slice(2, 4)"
          :key="member.name"
          :member="member"
          :cardNo="i"
          :limit="1"
        />
      </b-card-group>
      <b-col sm="12">
        <about-card
          class="d-block d-md-none"
          v-for="(member, i) in teamMembers"
          :key="member.name"
          :member="member"
          :cardNo="i"
          :limit="100"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AboutCard from "./AboutCard.vue";

export default {
  name: "ResponsiveCards",
  props: ["teamMembers"],
  components: {
    AboutCard,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
