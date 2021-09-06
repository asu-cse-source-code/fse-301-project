import { Meteor } from "meteor/meteor";
import Todo from "./collections/Todo.js";

Meteor.startup(() => {
  // if the Todo collection is empty
  if (Todo.find().count() === 0) {
    const data = [
      {
        title: "Login",
        description:
          "Login or create an account to start keeping track of your tasks!",
        url: "/login",
        createdAt: new Date(),
      },
      {
        title: "Do the Tutorial",
        description: "Check out the tutorial for any confusion",
        url: "/tutorial",
        createdAt: new Date(),
      },
      {
        title: "Read the Docs",
        description: "Read the documentation we have!",
        url: "/docs",
        createdAt: new Date(),
      },
    ];

    data.forEach((todo) => Todo.insert(todo));
  }
});
