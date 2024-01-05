import { useState, Suspense } from "react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import sortingAtom from "@/recoil/sortingAtom";
import createMonthData from "@/utils/createMonthData";
import CalendarNavigation from "./CalendarNavigation";
import ErrorBoundary from "../error/ErrorBoundary";
import Loading from "../Loading";
import DayOfWeekCardContainer from "./DayOfWeekCardContainer";
import CalendarCardContainer from "./calendarMode/CalendarCardContainer";
import ListCardContainer from "./listMode/ListCardContainer";
import GoUpButton from "../GoUpButton";
import Popup from "../Popup";
import { gray2 } from "@/styles/colors";

const DAY_OF_WEEK_MAP: Record<DAY_OF_WEEK, string> = {
    sunday: "일요일",
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
} as const;

const MainPage = () => {
    const [current, setCurrent] = useState(dayjs());

    const sortingMode = useRecoilValue(sortingAtom);

    // day of week: 요일, date: 일
    // 일요일: 0, 토요일: 6
    // 이번 달의 시작하는 요일
    const firstDayOfMonth = current.startOf("month");
    const startingDayOfWeek = firstDayOfMonth.day();

    // 이번 달의 마지막 일
    const endDateOfMonth = current.endOf("month");
    const endDate = endDateOfMonth.date();

    // 저번 달의 마지막 일
    const endDateOfLastMonth = current
        .subtract(1, "month")
        .endOf("month")
        .date();

    const prevYearAndMonth = current
        .subtract(1, "month")
        .format("YYYY-MM") as YearAndMonth;
    const currentYearAndMonth = current.format("YYYY-MM") as YearAndMonth;
    const nextYearAndMonth = current
        .add(1, "month")
        .format("YYYY-MM") as YearAndMonth;

    const calendarData = createMonthData(
        startingDayOfWeek,
        endDate,
        endDateOfLastMonth,
        currentYearAndMonth,
        prevYearAndMonth,
        nextYearAndMonth
    );

    const changeCurrent = (date: Date) => {
        setCurrent(dayjs(date));
    };

    const goPrevMonth = () => {
        setCurrent((prev) => prev.subtract(1, "month"));
    };

    const goNextMonth = () => {
        setCurrent((prev) => prev.add(1, "month"));
    };

    return (
        <Wrapper>
            <ErrorBoundary>
                <CalendarNavigation
                    current={current}
                    changeCurrent={changeCurrent}
                    goPrevMonth={goPrevMonth}
                    goNextMonth={goNextMonth}
                />
                <DayOfWeekCardContainer dayOfWeekMap={DAY_OF_WEEK_MAP} />
                <Suspense fallback={<Loading />}>
                    {sortingMode === "calendar" ? (
                        <CalendarCardContainer
                            prevYearAndMonth={prevYearAndMonth}
                            currentYearAndMonth={currentYearAndMonth}
                            nextYearAndMonth={nextYearAndMonth}
                            calendarData={calendarData}
                        />
                    ) : (
                        <ListCardContainer
                            prevYearAndMonth={prevYearAndMonth}
                            currentYearAndMonth={currentYearAndMonth}
                            nextYearAndMonth={nextYearAndMonth}
                            calendarData={calendarData}
                        />
                    )}
                </Suspense>
            </ErrorBoundary>
            <GoUpButton />
            <Popup />
        </Wrapper>
    );
};

const Wrapper = styled.section`
    border-bottom: 3px solid ${gray2};
`;

export default MainPage;
