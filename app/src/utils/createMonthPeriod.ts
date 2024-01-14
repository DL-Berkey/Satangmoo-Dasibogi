import dayjs from "dayjs";

export const getStartingDate = (yearAndMonth: YearAndMonth) => {
    const result = dayjs(yearAndMonth).startOf("month").format("YYYY-MM-DD");

    return result;
};

export const getEndDate = (yearAndMonth: YearAndMonth) => {
    const result = dayjs(yearAndMonth).endOf("month").format("YYYY-MM-DD");

    return result;
};

/**
 * 특정 달의 시작일과 종료일을 만들어주는 함수
 */
const createMonthPeriod = ({
    currentYearAndMonth,
    prevYearAndMonth,
    nextYearAndMonth,
}: {
    currentYearAndMonth: YearAndMonth;
    prevYearAndMonth: YearAndMonth;
    nextYearAndMonth: YearAndMonth;
}) => {
    const currentMonthStartingDate = getStartingDate(currentYearAndMonth);
    const currentMonthEndDate = getEndDate(currentYearAndMonth);

    const prevMonthStartingDate = getStartingDate(prevYearAndMonth);
    const prevMonthEndDate = getEndDate(prevYearAndMonth);

    const nextMonthStartingDate = getStartingDate(nextYearAndMonth);
    const nextMonthEndDate = getEndDate(nextYearAndMonth);

    return {
        currentMonthPeriod: {
            yearAndMonth: currentYearAndMonth,
            startingDate: currentMonthStartingDate,
            endDate: currentMonthEndDate,
        },
        prevMonthPeriod: {
            yearAndMonth: prevYearAndMonth,
            startingDate: prevMonthStartingDate,
            endDate: prevMonthEndDate,
        },
        nextMonthPeriod: {
            yearAndMonth: nextYearAndMonth,
            startingDate: nextMonthStartingDate,
            endDate: nextMonthEndDate,
        },
    };
};

export default createMonthPeriod;
