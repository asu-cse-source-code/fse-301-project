import { Meteor } from "meteor/meteor";
import Todo from "./collections/Todo.js";

Meteor.startup(() => {
  // if the Todo collection is empty
  if (Todo.find().count() === 0) {
    const data = [
      {
        title: "Do the Tutorial",
        url: "/tutorial",
        createdAt: new Date(),
      },
      {
        title: "Read the Docs",
        url: "/docs",
        createdAt: new Date(),
      },
      {
        title: "Add Todo Items!",
        url: "",
        createdAt: new Date(),
      },
    ];

    data.forEach((todo) => Todo.insert(todo));
  }
});
