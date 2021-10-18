<template>
  <div>
    <center>
      <h1>Oops something went wrong!</h1>
      <p class="mt-5">
        <b-link href="/">Go home?</b-link>
      </p>
    </center>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
  color: rgb(59, 59, 59);
}
h4 {
  color: var(--border);
  color: rgb(59, 59, 59);
}
a:hover {
  color: rgb(24, 28, 63);
  text-decoration: none;
}
a {
  color: rgb(40, 55, 190);
  text-decoration: underline;
}
</style>
