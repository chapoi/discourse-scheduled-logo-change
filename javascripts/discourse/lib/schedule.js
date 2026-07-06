export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function monthNumber(name) {
  const index = MONTHS.indexOf(name);
  return index === -1 ? null : index + 1;
}

export function dayOrdinal(date) {
  return (date.getMonth() + 1) * 100 + date.getDate();
}

export function isActive(schedule, today) {
  const startMonth = monthNumber(schedule.start_month);
  const endMonth = monthNumber(schedule.end_month);

  if (startMonth === null || endMonth === null) {
    return false;
  }

  const start = startMonth * 100 + schedule.start_day;
  const end = endMonth * 100 + schedule.end_day;

  if (start <= end) {
    return today >= start && today <= end;
  }

  return today >= start || today <= end;
}

export function activeSchedule(schedules, today) {
  if (!Array.isArray(schedules) || schedules.length === 0) {
    return null;
  }

  return schedules.find((schedule) => isActive(schedule, today)) || null;
}

export function logoFor(schedule, name, dark) {
  switch (name) {
    case "logo":
      return dark ? schedule.logo_dark || schedule.logo : schedule.logo;
    case "logo_small":
      return dark
        ? schedule.logo_small_dark || schedule.logo_small
        : schedule.logo_small;
    case "mobile_logo":
      return dark
        ? schedule.mobile_logo_dark || schedule.mobile_logo
        : schedule.mobile_logo;
    default:
      return null;
  }
}
