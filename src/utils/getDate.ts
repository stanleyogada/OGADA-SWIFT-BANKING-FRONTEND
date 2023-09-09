const getExactDay = (day: number) => {
  let exactDay: string;

  switch (day) {
    case 0:
      exactDay = "Sunday";
      return exactDay;

    case 1:
      exactDay = "Monday";
      return exactDay;

    case 2:
      exactDay = "Tuesday";
      return exactDay;

    case 3:
      exactDay = "Wednesday";
      return exactDay;

    case 4:
      exactDay = "Thursday";
      return exactDay;

    case 5:
      exactDay = "Friday";
      return exactDay;

    case 6:
      exactDay = "Saturday";
      return exactDay;
  }
};

const getExactMonth = (month: number) => {
  let exactMonth: string;
  switch (month) {
    case 0:
      exactMonth = "Jan";
      return exactMonth;

    case 1:
      exactMonth = "Feb";
      return exactMonth;

    case 2:
      exactMonth = "Mar";
      return exactMonth;

    case 3:
      exactMonth = "Apr";
      return exactMonth;

    case 4:
      exactMonth = "May";
      return exactMonth;

    case 5:
      exactMonth = "June";
      return exactMonth;

    case 6:
      exactMonth = "July";
      return exactMonth;

    case 7:
      exactMonth = "Aug";
      return exactMonth;

    case 8:
      exactMonth = "Sep";
      return exactMonth;

    case 9:
      exactMonth = "Oct";
      return exactMonth;

    case 10:
      exactMonth = "Nov";
      return exactMonth;

    case 11:
      exactMonth = "Dec";
      return exactMonth;
  }
};

export { getExactDay, getExactMonth };
