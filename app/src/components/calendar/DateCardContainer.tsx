import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { useFetchingAllVideo } from "@/hooks/useVideo";
import sortingAtom from "@/recoil/sortingAtom";
import createMonthPeriod from "@/utils/createMonthPeriod";
import DateCard from "./DateCard";
import { gray2 } from "@/styles/colors";
import { dateCardContainerMedia } from "@/styles/media";
import { dateCardContainerListMode } from "@/styles/listMode";
import EmptyPage from "../EmptyPage";

interface Props {
    prevYearAndMonth: string;
    currentYearAndMonth: string;
    nextYearAndMonth: string;
    calendarData: CalendarData;
}

const DateCardContainer = ({
    prevYearAndMonth,
    currentYearAndMonth,
    nextYearAndMonth,
    calendarData,
}: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const query = useFetchingAllVideo(
        createMonthPeriod({
            currentYearAndMonth,
            prevYearAndMonth,
            nextYearAndMonth,
        })
    );

    const { currentMonthQuery, prevMonthQuery, nextMonthQuery } = query;

    const sorting = useRecoilValue(sortingAtom);

    return (
        <Wrapper ref={containerRef} className={sorting}>
            {calendarData[prevYearAndMonth].map((value) => {
                let videoData = prevMonthQuery.data.get(
                    prevYearAndMonth + "-" + value.toString().padStart(2, "0")
                );

                // sorting mode가 list면 렌더링하지 않음
                if (sorting === "list") {
                    return null;
                }

                return (
                    <DateCard
                        id="prevMonth"
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
            {calendarData[currentYearAndMonth].map((value) => {
                let videoData = currentMonthQuery.data.get(
                    currentYearAndMonth +
                        "-" +
                        value.toString().padStart(2, "0")
                );

                if (sorting === "list" && videoData === undefined) {
                    return null;
                }

                return (
                    <DateCard
                        id="currentMonth"
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
            {calendarData[nextYearAndMonth].map((value) => {
                let videoData = nextMonthQuery.data.get(
                    nextYearAndMonth + "-" + value.toString().padStart(2, "0")
                );

                // sorting mode가 list면 렌더링하지 않음
                if (sorting === "list") {
                    return null;
                }

                return (
                    <DateCard
                        id="nextMonth"
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
            {/* 목록으로 보기에서 다시보기 영상이 없을 때 띄우는 페이지 */}
            {currentMonthQuery.data.size === 0 && <EmptyPage />}
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    ref: React.MutableRefObject<HTMLDivElement | null>;
}>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1%;

    height: 85%;

    background-color: ${gray2};

    ${dateCardContainerListMode}

    ${dateCardContainerMedia}
`;

export default DateCardContainer;
