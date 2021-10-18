<template>
  <div class="center">
    <h1 class="pt-5">{{ greeting }}</h1>
    <span v-if="currentUser" class="center">Your first task today is:</span>
    <span v-else-if="!currentUser" class="center"
      >Here are a few tasks to get you started. Try to click the task you'd like
      to complete!</span
    >
  </div>
</template>

<script>
export default {
  data() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var curHr = today.getHours();
    let greeting = "Good morning!";

    if (curHr < 18 && curHr > 11) {
      greeting = "Good afternoon!";
    } else if (curHr > 17) {
      greeting = "Good evening!";
    }

    today = mm + "-" + dd + "-" + yyyy;
    return {
      greeting: greeting,
      curHr: curHr,
    };
  },
  meteor: {
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

<style scoped>
ul {
  font-family: monospace;
}

div.center-center {
  height: 400px;
  line-height: 355px;
  text-align: center;
  /* border: 2px dashed #f69c55; */
}
span.center-center {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
h1.center-center {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
</style>
