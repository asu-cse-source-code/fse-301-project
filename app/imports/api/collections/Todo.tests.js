// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from "meteor/meteor";
import { assert } from "chai";
import Todo from "./Todo.js";

if (Meteor.isServer) {
  describe("todo collection", function () {
    it("insert correctly", function () {
      const todoId = Todo.insert({
        title: "meteor homepage",
        url: "https://www.meteor.com",
      });
      const added = Todo.find({ _id: todoId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, "todo");
      assert.equal(count, 1);
    });
  });
}
