const convertToWeekDayService = date => {
  const formattedDate = new Date(date * 1000);
  const weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return weekDays[formattedDate.getDay()];
};

export default convertToWeekDayService;
