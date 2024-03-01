import dayjs from "dayjs";

type GetFullDate = (yearAndMonth: YearAndMonth) => FullDate;

type CreateMonthPeriod = ({
    currentYearAndMonth,
    prevYearAndMonth,
    nextYearAndMonth,
}: {
    currentYearAndMonth: YearAndMonth;
    prevYearAndMonth: YearAndMonth;
    nextYearAndMonth: YearAndMonth;
}) => Record<
    "currentMonthPeriod" | "prevMonthPeriod" | "nextMonthPeriod",
    MonthPeriod
>;

export const getStartingFullDate: GetFullDate = (yearAndMonth) => {
    const result = dayjs(yearAndMonth).startOf("month").format("YYYY-MM-DD");

    return result as FullDate;
};

export const getEndFullDate: GetFullDate = (yearAndMonth) => {
    const result = dayjs(yearAndMonth).endOf("month").format("YYYY-MM-DD");

    return result as FullDate;
};

/**
 * 특정 달의 시작일과 종료일을 만들어주는 함수
 */
const createMonthPeriod: CreateMonthPeriod = ({
    currentYearAndMonth,
    prevYearAndMonth,
    nextYearAndMonth,
}) => {
    const currentMonthStartingDate = getStartingFullDate(currentYearAndMonth);
    const currentMonthEndDate = getEndFullDate(currentYearAndMonth);

    const prevMonthStartingDate = getStartingFullDate(prevYearAndMonth);
    const prevMonthEndDate = getEndFullDate(prevYearAndMonth);

    const nextMonthStartingDate = getStartingFullDate(nextYearAndMonth);
    const nextMonthEndDate = getEndFullDate(nextYearAndMonth);

    return {
        currentMonthPeriod: {
            yearAndMonth: currentYearAndMonth,
            startingFullDate: currentMonthStartingDate,
            endFullDate: currentMonthEndDate,
        },
        prevMonthPeriod: {
            yearAndMonth: prevYearAndMonth,
            startingFullDate: prevMonthStartingDate,
            endFullDate: prevMonthEndDate,
        },
        nextMonthPeriod: {
            yearAndMonth: nextYearAndMonth,
            startingFullDate: nextMonthStartingDate,
            endFullDate: nextMonthEndDate,
        },
    };
};

export default createMonthPeriod;
