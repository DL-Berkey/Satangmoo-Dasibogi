import styled from "styled-components";

import { useFetchingAllVideo } from "@/hooks/useVideo";

import createFullDate from "@/utils/createFullDate";
import useCalendar from "@/hooks/useCalendar";
import createMonthPeriod from "@/utils/createMonthPeriod";
import CalendarCard from "./CalendarCard";
import { gray2 } from "@/styles/colors";
import { dateCardContainerMedia } from "@/styles/media";

const getCalendarCardArray = ({
    yearAndMonth,
    days,
    monthlyVideo,
}: {
    yearAndMonth: YearAndMonth;
    days: Day[];
    monthlyVideo: MonthlyVideo;
}) => {
    return days.map((day) => {
        const fullDate = createFullDate(yearAndMonth, day);

        const videoData = monthlyVideo.get(fullDate);

        return (
            <CalendarCard
                key={fullDate}
                fullDate={String(day)}
                videoData={videoData}
            />
        );
    });
};

const CalendarCardContainer = () => {
    const {
        monthDays,
        yearAndMonth: {
            prevYearAndMonth,
            currentYearAndMonth,
            nextYearAndMonth,
        },
    } = useCalendar();

    const query = useFetchingAllVideo(
        createMonthPeriod({
            currentYearAndMonth: currentYearAndMonth,
            prevYearAndMonth: prevYearAndMonth,
            nextYearAndMonth: nextYearAndMonth,
        })
    );

    const { currentMonthQuery, prevMonthQuery, nextMonthQuery } = query;

    return (
        <Wrapper>
            {getCalendarCardArray({
                yearAndMonth: prevYearAndMonth,
                days: monthDays[prevYearAndMonth],
                monthlyVideo: prevMonthQuery.data,
            })}
            {getCalendarCardArray({
                yearAndMonth: currentYearAndMonth,
                days: monthDays[currentYearAndMonth],
                monthlyVideo: currentMonthQuery.data,
            })}
            {getCalendarCardArray({
                yearAndMonth: nextYearAndMonth,
                days: monthDays[nextYearAndMonth],
                monthlyVideo: nextMonthQuery.data,
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1%;

    height: 80vh;

    background-color: ${gray2};

    ${dateCardContainerMedia}
`;

export default CalendarCardContainer;
