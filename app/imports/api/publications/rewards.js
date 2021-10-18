import { Meteor } from "meteor/meteor";
import Rewards from "../collections/Rewards.js";

Meteor.publish("rewards", function () {
  return Rewards.find({ owner: this.userId });
});
