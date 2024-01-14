// TODO:
const createFullDate = (yearAndMonth: YearAndMonth, day: number) => {
    return yearAndMonth + "-" + String(day).padStart(2, "0");
};

export default createFullDate;
