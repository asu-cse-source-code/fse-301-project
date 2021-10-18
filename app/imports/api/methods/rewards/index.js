import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Rewards from "../../collections/Rewards";

/**
 *
 * Rewards Example Object
 *
 *
 * points
 * // pointsObj will keep allow us to make a graph of the users points over time
 * // Also will allow us to track top users over time (yearly, monthly, weekly, daily)
 * pointsObj {
 *  date: points
 * }
 * streak
 * appStreak
 * longestStreak
 * longestAppStreak
 * daysOnApp [days]
 * createdAt
 * username
 * owner
 * _id
 *
 *
 *
 */

Meteor.methods({
  "Rewards.initializeUser"(username) {
    const data = {
      points: 0,
      pointsObj: {},
      streak: 0,
      appStreak: 0,
      longestAppStreak: 0,
      longestPositiveStreak: 0,
      completed: 0,
      completedOnTime: 0,
      completedEarly: 0,
      completedLate: 0,
      daysOnApp: [],
      createdAt: new Date(),
      username: username,
      owner: this.userId,
    };
    Rewards.insert(data);
  },
  addPoints(points, sentiment, bonus) {
    const data = Rewards.findOne({ owner: this.userId });

    if (!data) return;

    // Get the new total points

    let newPoints = points;
    if (data.points && data.points > 0) {
      newPoints += data.points;
    }

    // Get current day month year

    const today = new Date().toDateString();
    // console.log(today);

    // Update the points object

    const pointsObj = data.pointsObj;

    if (today in pointsObj) {
      pointsObj[today] = pointsObj[today] + points;
    } else {
      pointsObj[today] = points;
    }

    // Updating points streak
    // sentiment tells whether this is a positive action or negative

    let streak = data.streak;

    // Check if this is just a streak bonus and if it is don't update the streak
    // since this was not a task completed
    if (!bonus) {
      if (streak < 0 && sentiment) {
        streak = 1;
      } else if (streak < 0) {
        streak -= 1;
      } else if (streak > 0 && sentiment) {
        streak += 1;
      } else {
        streak = -1;
      }
    }

    let longestStreak = data.longestPositiveStreak;

    if (streak > longestStreak) {
      longestStreak = streak;
    }

    // Update completed count
    let completedOnTime = data.completedOnTime;
    let completedEarly = data.completedEarly;
    let completedLate = data.completedLate;

    if (points === 100) {
      completedEarly = completedEarly ? completedEarly + 1 : 1;
    } else if (points === 75) {
      completedOnTime = completedOnTime ? completedOnTime + 1 : 1;
    } else if (points === 20) {
      completedLate = completedLate ? completedLate + 1 : 1;
    }

    return Rewards.update(data._id, {
      $set: {
        streak: streak,
        points: newPoints,
        pointsObj: pointsObj,
        longestPositiveStreak: longestStreak,
        completedOnTime: completedOnTime,
        completedEarly: completedEarly,
        completedLate: completedLate,
      },
    });
  },
  removePoints(todo) {
    const data = Rewards.findOne({ owner: this.userId });

    if (!data) return;

    let points = 0;
    if (data.points && data.points > 0) {
      points = data.points;
    }

    let newPoints = points - todo.points;
    if (newPoints < 0) {
      newPoints = 0;
    }

    const thisDate = todo.timeCompleted.toDateString();
    pointsObj = data.pointsObj;

    if (thisDate in pointsObj) {
      pointsObj[thisDate] = pointsObj[thisDate] - todo.points;
      if (pointsObj[thisDate] <= 0) {
        // Should never be less than 0
        delete pointsObj[thisDate];
      }
    }

    // Update completed count
    let completedOnTime = data.completedOnTime;
    let completedEarly = data.completedEarly;
    let completedLate = data.completedLate;

    if (todo.points === 100) {
      completedEarly -= 1;
      completedEarly = completedEarly < 0 ? 0 : completedEarly;
    } else if (todo.points === 75) {
      completedOnTime -= 1;
      completedOnTime = completedOnTime < 0 ? 0 : completedOnTime;
    } else if (todo.points === 20) {
      completedLate -= 1;
      completedLate = completedLate < 0 ? 0 : completedLate;
    }

    return Rewards.update(data._id, {
      $set: {
        points: newPoints,
        pointsObj: pointsObj,
        completedOnTime: completedOnTime,
        completedEarly: completedEarly,
        completedLate: completedLate,
      },
    });
  },
  appStreak() {
    const data = Rewards.findOne({ owner: this.userId });

    if (!data) {
      throw new Meteor.Error("no-rewards");
    }

    const todaysDate = new Date();
    const yesterdayDate = new Date(todaysDate);

    const today = todaysDate.toDateString();
    let yesterday = yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    yesterday = new Date(yesterday).toDateString();

    // First check if we already updated today
    const daysOnApp = data.daysOnApp;

    if (daysOnApp.includes(today)) {
      throw new Meteor.Error("already-updated");
    }

    // Update app streak
    let appStreak = 1;

    // Check if logged in yesterday
    // If not ... keep appStreak at 1
    if (daysOnApp.includes(yesterday)) {
      appStreak = data.appStreak + 1;
    }

    // Check if this is the longest streak and update if so
    let longestStreak = data.longestAppStreak;

    if (appStreak > longestStreak) {
      longestStreak = appStreak;
    }

    daysOnApp.push(today);

    return Rewards.update(data._id, {
      $set: {
        appStreak: appStreak,
        daysOnApp: daysOnApp,
        longestAppStreak: longestStreak,
      },
    });
  },
  getRewards(id) {
    check(id, String);

    return Rewards.findOne({ owner: this.userId });
  },
});
