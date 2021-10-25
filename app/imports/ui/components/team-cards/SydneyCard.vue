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
        name: "Sidney Schultz",
        title: "Design & Marketing",
        info: "Student at ASU studying Management",
        image: "/images/sydney.jpeg",
        linkOne: "https://www.linkedin.com/in/sidney-schultz-8053b9193/",
        linkOneTitle: "LinkedIn",
      },
    };
  },

  mounted() {},

  methods: {},
};
</script>
