import dayjs from "dayjs";

const getStartingDate = (yearAndMonth: string) => {
    const result = dayjs(yearAndMonth).startOf("month").format("YYYY-MM-DD");

    return result;
};

const getEndDate = (yearAndMonth: string) => {
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
    currentYearAndMonth: string;
    prevYearAndMonth: string;
    nextYearAndMonth: string;
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
