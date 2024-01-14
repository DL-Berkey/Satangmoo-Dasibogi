/**
 *
 * @param startingDayOfWeek 이번 달 시작일의 요일
 * @param endDateOfCurrentMonth 이번 달 마지막 일
 * @param endDayOfLastMonth 저번 달의 마지막 일\
 * @param currentYearAndMonth 이번 달의 정보 (YYYY-MM)
 * @param prevYearAndMonth 저번 달의 정보 (YYYY-MM)
 * @param nextYearAndMonth 다음번 달의 정보 (YYYY-MM)
 */
const createMonthData = (
    startingDayOfWeek: number,
    endDateOfCurrentMonth: number,
    endDateOfLastMonth: number,
    currentYearAndMonth: string,
    prevYearAndMonth?: string,
    nextYearAndMonth?: string
) => {
    let day = 1;
    const dateArray = Array(42)
        .fill(undefined)
        .map((_, idx) => {
            if (idx < startingDayOfWeek) {
                return endDateOfLastMonth - (startingDayOfWeek - 1 - idx);
            }

            if (day > endDateOfCurrentMonth) {
                day = 1;
            }

            return day++;
        });

    // TODO: Map 객체로 변경!
    const monthData: MonthData = {};

    if (prevYearAndMonth) {
        monthData[prevYearAndMonth] = dateArray.splice(0, startingDayOfWeek);
    }

    monthData[currentYearAndMonth] = dateArray.splice(0, endDateOfCurrentMonth);

    if (nextYearAndMonth) {
        monthData[nextYearAndMonth] = [...dateArray];
    }

    return monthData;
};

export default createMonthData;
