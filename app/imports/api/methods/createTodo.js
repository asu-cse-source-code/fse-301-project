import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Todo from "../collections/Todo.js";

/**
 *
 * Todo Example Object
 *
 * title
 * description
 * url (link to task)
 * priority level (i ii iii)
 * dueDate (date of when this task needs completed)
 * completed (boolean whether this task is completed)
 * username (creator of the task)
 * createdAt (time this task was created)
 * _id (auto created taskId by mongo)
 *
 *
 */

Meteor.methods({
  createTodo(form) {
    check(form.title, String);
    check(form.priority, Number);

    if (!this.userId) {
      throw new Meteor.Error("Please login before adding a task!");
    }

    return Todo.insert({
      title: form.title,
      description: form.description,
      url: form.url,
      priority: form.priority,
      dueDate: form.dueDate,
      completed: form.completed,
      createdAt: new Date(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});
