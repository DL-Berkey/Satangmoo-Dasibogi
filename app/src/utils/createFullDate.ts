const createFullDate = (yearAndMonth: YearAndMonth, day: Day) => {
    return (yearAndMonth + "-" + String(day).padStart(2, "0")) as FullDate;
};

export default createFullDate;
