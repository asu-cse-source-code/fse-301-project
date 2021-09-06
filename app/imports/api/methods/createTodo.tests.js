import { Meteor } from "meteor/meteor";
import { assert } from "chai";
import Todo from "../collections/Todo.js";
import "./methods.js";

if (Meteor.isServer) {
  describe("method: createTodo", function () {
    beforeEach(function () {
      Todo.remove({});
    });

    it("can add a new Todo", function () {
      const addTodo = Meteor.server.method_handlers["createTodo"];

      addTodo.apply({}, ["meteor.com", "https://www.meteor.com"]);

      assert.equal(Todo.find().count(), 1);
    });
  });
}
