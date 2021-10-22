import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Todo from "../../collections/Todo";

const timeDif = require("../../helper/timeRemaining.js");

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
      dueTime: form.dueTime,
      due: form.dueDate + "T" + form.dueTime,
      status: "Incomplete",
      completed: form.completed,
      createdAt: new Date(),
      username: Meteor.users.findOne(this.userId).username,
      owner: this.userId,
    });
  },
  initializeUser(username) {
    const now = new Date();
    const date = new Date(now.getTime() + 180 * 60000);
    const time = date.toTimeString().slice(0, 8);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dueDate = `${year}-${month + 1}-${day}`;
    const fullTime = `${year}-${month + 1}-${day}T${time}`;

    const data = [
      {
        title: "Login",
        description:
          "Login or create an account to start keeping track of your tasks!",
        url: "/login",
        priority: 1,
        dueDate: dueDate,
        dueTime: time,
        due: fullTime,
        completed: true,
        status: "On Time",
        timeDifference: "1 minute",
        createdAt: date,
        timeCompleted: date,
        username: username,
        owner: this.userId,
      },
      {
        title: "Read the Docs",
        description: "Read the documentation we have!",
        url: "https://docs.nolimit.austinbspencer.com/#/",
        priority: 1,
        dueDate: dueDate,
        dueTime: time,
        due: fullTime,
        status: "Incomplete",
        completed: false,
        createdAt: date,
        username: username,
        owner: this.userId,
      },
    ];

    data.forEach((todo) => Todo.insert(todo));
  },
  completeTodo(todoId, val) {
    check(todoId, String);

    const todo = Todo.findOne(todoId);

    if (todo.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    let status = "Incomplete";
    let timeDifference = null;
    let points = 0;

    const timeCompleted = new Date();

    if (val) {
      let dif = timeDif.difference(timeCompleted, todo.due);
      status = dif[0].status;
      timeDifference = dif[0].difference;

      // Need to add points to rewards
      points = 20;
      if (status === "On Time") {
        points = 75;
      } else if (status === "Early") {
        points = 100;
      }

      const sentiment = points > 20;

      Meteor.call("addPoints", points, sentiment, false, (error) => {
        if (error) {
          console.log("Error adding points: ", error.error);
        }
      });
    } else {
      // Need to remove the points from rewards

      Meteor.call("removePoints", todo, (error) => {
        if (error) {
          console.log("Error removing points: ", error.error);
        }
      });
    }

    Todo.update(todoId, {
      $set: {
        completed: val,
        timeCompleted: timeCompleted,
        status: status,
        timeDifference: timeDifference,
        points: points,
      },
    });

    return points;
  },
  removeTodo(todoId) {
    check(todoId, String);

    const todo = Todo.findOne(todoId);

    if (todo.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Todo.remove(todoId);
  },
  updateTodo(form) {
    const todo = Todo.findOne(form._id);

    if (todo.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Todo.update(todo._id, {
      $set: {
        title: form.title,
        description: form.description,
        url: form.url,
        priority: form.priority,
        dueDate: form.dueDate,
        dueTime: form.dueTime,
        due: form.dueDate + "T" + form.dueTime,
        completed: form.completed,
        edited: true,
        editedAt: new Date(),
      },
    });
  },
  getTodo(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    const data = Todo.findOne(taskId);

    if (data === undefined || data === null) {
      throw new Meteor.Error("Task not found");
    }

    return data;
  },
  updatePriority(newPriority, oldPriority, taskId) {
    const todo = Todo.findOne(taskId);

    if (todo.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    let allTasks = null;
    let incr = 0;
    // Since new priority is > the tasks with lower priority than old aren't changed
    if (newPriority > oldPriority) {
      allTasks = Todo.find({
        owner: this.userId,
        priority: { $gt: oldPriority },
      }).fetch();
      incr = -1;
    } else {
      allTasks = Todo.find({
        owner: this.userId,
        priority: { $gte: newPriority },
      }).fetch();
      incr = 1;
    }

    console.log(allTasks);

    for (var task in allTasks) {
      var obj = allTasks[task];
      console.log(task);
      if (obj === null) throw new Meteor.Error("obj is null");
      if (
        (obj.priority <= newPriority && incr === -1) ||
        (obj.priority < oldPriority && incr === 1)
      ) {
        const newPri = obj.priority + incr;
        Todo.update(obj._id, {
          $set: {
            priority: newPri,
          },
        });
      }
    }

    return Todo.update(taskId, {
      $set: {
        priority: newPriority,
      },
    });
  },
});
