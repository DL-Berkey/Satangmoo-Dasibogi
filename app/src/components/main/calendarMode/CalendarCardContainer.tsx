import styled from "styled-components";

import { useFetchingAllVideo } from "@/hooks/useVideo";

import useCalendar from "@/hooks/useCalendar";
import createMonthPeriod from "@/utils/createMonthPeriod";
import CalendarCard from "./CalendarCard";
import { gray2 } from "@/styles/colors";
import { dateCardContainerMedia } from "@/styles/media";

const getDataCardArray = (params: {
    yearAndMonth: YearAndMonth;
    dateArray: number[];
    mappedVideoData: Map<string, VideoData>;
}) => {
    const { yearAndMonth, dateArray, mappedVideoData } = params;

    return dateArray.map((value) => {
        let videoData = mappedVideoData.get(
            yearAndMonth + "-" + value.toString().padStart(2, "0")
        );

        return (
            <CalendarCard
                key={yearAndMonth + String(value)}
                date={String(value)}
                videoData={videoData}
            />
        );
    });
};

const CalendarCardContainer = () => {
    const {
        monthData,
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
            {getDataCardArray({
                yearAndMonth: prevYearAndMonth,
                dateArray: monthData[prevYearAndMonth],
                mappedVideoData: prevMonthQuery.data,
            })}
            {getDataCardArray({
                yearAndMonth: currentYearAndMonth,
                dateArray: monthData[currentYearAndMonth],
                mappedVideoData: currentMonthQuery.data,
            })}
            {getDataCardArray({
                yearAndMonth: nextYearAndMonth,
                dateArray: monthData[nextYearAndMonth],
                mappedVideoData: nextMonthQuery.data,
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
