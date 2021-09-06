import { assert } from "chai";
import { PublicationCollector } from "meteor/johanbrook:publication-collector";
import Todo from "../collections/Todo.js";
import "./publications.js";

describe("Publish todo", function () {
  beforeEach(function () {
    Todo.remove({});
    Todo.insert({
      title: "meteor homepage",
      url: "https://www.meteor.com",
    });
  });

  it("sends all todo", function (done) {
    const collector = new PublicationCollector();
    collector.collect("todo", (collections) => {
      assert.equal(collections.todo.length, 1);
      done();
    });
  });
});
