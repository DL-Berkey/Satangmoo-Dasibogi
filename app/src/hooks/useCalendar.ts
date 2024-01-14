import { useRecoilState } from "recoil";
import dayjs from "dayjs";

import dateAtom from "@/recoil/dateAtom";
import createMonthData from "@/utils/createMonthData";

// TODO: refactor variable name
const useCalendar = () => {
    const [date, setDate] = useRecoilState(dateAtom);

    // day of week: 요일, date: 일
    // 일요일: 0, 토요일: 6
    // 이번 달의 시작하는 요일
    const firstDayOfMonth = date.startOf("month");
    const startingDayOfWeek = firstDayOfMonth.day();

    // 이번 달의 마지막 일
    const endDateOfMonth = date.endOf("month");
    const endDate = endDateOfMonth.date();

    // 저번 달의 마지막 일
    const endDateOfLastMonth = date.subtract(1, "month").endOf("month").date();

    const prevYearAndMonth = date
        .subtract(1, "month")
        .format("YYYY-MM") as YearAndMonth;
    const currentYearAndMonth = date.format("YYYY-MM") as YearAndMonth;
    const nextYearAndMonth = date
        .add(1, "month")
        .format("YYYY-MM") as YearAndMonth;

    const monthData = createMonthData(
        startingDayOfWeek,
        endDate,
        endDateOfLastMonth,
        currentYearAndMonth,
        prevYearAndMonth,
        nextYearAndMonth
    );

    const changeCurrentMonth = (date: Date) => {
        setDate(dayjs(date));
    };

    const goPrevMonth = () => {
        setDate((prev) => prev.subtract(1, "month"));
    };

    const goNextMonth = () => {
        setDate((prev) => prev.add(1, "month"));
    };

    const isCurrentMonth = (month: YearAndMonth | FullDate) => {
        return date.isSame(month, "month");
    };

    const yearAndMonth = {
        prevYearAndMonth,
        currentYearAndMonth,
        nextYearAndMonth,
    };

    return {
        date,
        monthData,
        changeCurrentMonth,
        goPrevMonth,
        goNextMonth,
        isCurrentMonth,
        yearAndMonth,
    };
};

export default useCalendar;
