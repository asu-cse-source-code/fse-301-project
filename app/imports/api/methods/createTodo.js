import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Todo from "../collections/Todo.js";

Meteor.methods({
  createTodo(title, url) {
    check(url, String);
    check(title, String);

    return Todo.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});
