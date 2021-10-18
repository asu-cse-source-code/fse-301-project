<template>
  <div>
    <b-container class="mb-5">
      <b-row align-h="center">
        <b-col cols="8">
          <h1 class="center mt-3">About No-Limit Planner</h1>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mb-5">
        <b-col cols="10">
          <h5 class="center mt-2 mb-5 muted-text">
            Inspired by the impact of mental health challenges like anxiety,
            depression, and ADHD on our lives, our team is committed to creating
            a better productivity app that will motivate you to stay on track.
            Using positive reinforcement, focus-enhancing tools, competition,
            and powerful organization, we try to rewire your brain to overcome
            its most basal distractions and achieve more. Have ideas on how to
            improve this system? Reach out to us below.
          </h5>
        </b-col>
      </b-row>
      <b-row class="mt-5 mb-5">
        <b-col sm="6" md="4" v-for="feature in features" :key="feature.title">
          <feature-card :feature="feature" />
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mt-5">
      <b-row align-h="center" class="mt-5">
        <b-col cols="8">
          <h4 class="center mt-5 mb-5">Meet The Team</h4>
        </b-col>
      </b-row>
      <responsive-cards :teamMembers="teamMembers" />
    </b-container>
  </div>
</template>

<script>
import teamMembers from "../components/json/team-members.json";
import ResponsiveCards from "../components/team-cards/ResponsiveCards.vue";
import features from "../components/json/feature-data.json";
import FeatureCard from "../components/feature-cards/FeatureCard.vue";

export default {
  name: "About",
  components: {
    ResponsiveCards,
    FeatureCard,
  },

  data() {
    return {
      teamMembers: teamMembers,
      features: features,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
