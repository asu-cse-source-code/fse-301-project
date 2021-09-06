import { Meteor } from "meteor/meteor";
import Todo from "../collections/Todo.js";

Meteor.publish("todos", function () {
  return Todo.find({ owner: this.userId });
});
