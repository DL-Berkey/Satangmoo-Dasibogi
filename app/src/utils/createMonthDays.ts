/**
 *
 * @param startingDayOfWeek 이번 달 시작일의 요일
 * @param endDayOfCurrentMonth 이번 달 마지막 일
 * @param endDayOfPrevMonth 저번 달의 마지막 일
 * @param currentYearAndMonth 이번 달의 정보 (YYYY-MM)
 * @param prevYearAndMonth 저번 달의 정보 (YYYY-MM)
 * @param nextYearAndMonth 다음번 달의 정보 (YYYY-MM)
 */
const createMonthDays = (
    startingDayOfWeek: number,
    endDayOfCurrentMonth: number,
    endDayOfPrevMonth: number,
    currentYearAndMonth: YearAndMonth,
    prevYearAndMonth?: YearAndMonth,
    nextYearAndMonth?: YearAndMonth
) => {
    let day = 1;
    const dateArray = <Day[]>Array(42)
        .fill(undefined)
        .map((_, idx) => {
            if (idx < startingDayOfWeek) {
                return endDayOfPrevMonth - (startingDayOfWeek - 1 - idx);
            }

            if (day > endDayOfCurrentMonth) {
                day = 1;
            }

            return day++;
        });

    const monthDays: MonthDays = {};

    if (prevYearAndMonth) {
        monthDays[prevYearAndMonth] = dateArray.splice(0, startingDayOfWeek);
    }

    monthDays[currentYearAndMonth] = dateArray.splice(0, endDayOfCurrentMonth);

    if (nextYearAndMonth) {
        monthDays[nextYearAndMonth] = [...dateArray];
    }

    return monthDays;
};

export default createMonthDays;
