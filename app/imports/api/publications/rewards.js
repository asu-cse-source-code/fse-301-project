import { Meteor } from "meteor/meteor";
import Rewards from "../collections/Rewards.js";

Meteor.publish("rewards", function () {
  return Rewards.find({ owner: this.userId });
});

Meteor.publish("topRewards", function () {
  return Rewards.find({ points: { $ne: 0 } });
});

Meteor.publish("allRewards", function () {
  return Rewards.find();
});
