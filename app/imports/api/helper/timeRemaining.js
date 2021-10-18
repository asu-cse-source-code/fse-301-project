module.exports = {
  name: "time-remaining",
  description: "Returns the time between two dates",
  /**
   * This command is a simple call and response
   *
   * @param {string} date1 date to check difference between now and then
   * @param {string} dueDate date to check difference between now and then
   *
   * @return {int} Days between the two given dates
   */
  difference(date1, dueDate) {
    if (!date1 || !dueDate) {
      return [
        {
          difference: "",
          overDue: false,
        },
      ];
    }
    // To set two dates to two variables
    var date1 = new Date(date1);
    var date2 = new Date(dueDate);

    let diffInMilliSeconds = (date2 - date1) / 1000;

    const negative = diffInMilliSeconds < 0;

    diffInMilliSeconds = Math.abs(diffInMilliSeconds);

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let early = false;

    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day` : `${days} days`;
      if (!negative) {
        early = true;
      }
    }

    if (hours > 0 && days === 0) {
      difference += hours === 1 ? `1 hour and ` : `${hours} hours`;
    }

    if (days === 0 && hours < 2) {
      difference +=
        minutes === 0 || minutes == 1 ? `1 minute` : `${minutes} minutes`;
    }

    let status = "Early";

    if (!negative && !early) {
      status = "On Time";
    } else if (negative) {
      status = "Late";
    }

    const difArr = [
      {
        difference: difference,
        status: status,
      },
    ];

    return difArr;
  },
};
