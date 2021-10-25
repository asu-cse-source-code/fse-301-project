<template>
  <b-card
    :title="member.name"
    :sub-title="member.title"
    :img-src="member.image"
    :img-alt="member.name"
    img-top
  >
    <b-card-text>
      {{ member.info }}
    </b-card-text>
    <template #footer>
      <b-button
        id="dark-outline"
        size="md"
        variant="outline-dark"
        class="float-left mt-1 mb-3"
        :href="member.linkOne"
      >
        {{ member.linkOneTitle }}
      </b-button>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "Fse301ProjectAustincard",

  data() {
    return {
      member: {
        name: "Austin Spencer",
        title: "Developer",
        info: "Student at ASU studying Computer Science",
        image: "/images/austin.JPG",
        linkOne: "https://www.linkedin.com/in/austinbspencer/",
        linkOneTitle: "LinkedIn",
      },
    };
  },

  mounted() {},

  methods: {},
};
</script>
