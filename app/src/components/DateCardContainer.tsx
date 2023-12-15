import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { FaArrowUp } from "react-icons/fa";

import { useFetchingAllVideo } from "@/hooks/useVideo";
import sortingAtom from "@/recoil/sortingAtom";
import createMonthPeriod from "@/utils/createMonthPeriod";
import DateCard from "./DateCard";
import { gray2, mainRed } from "@/styles/colors";
import { dateCardContainerMedia } from "@/styles/media";
import { dateCardContainerListMode } from "@/styles/listMode";

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

    const currentMonthVideoData = currentMonthQuery.data;
    const prevMonthVideoData = prevMonthQuery.data;
    const nextMonthVideoData = nextMonthQuery.data;

    const sorting = useRecoilValue(sortingAtom);

    const onClickGoUpButton = () => {
        if (!containerRef.current) {
            return;
        }

        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Wrapper ref={containerRef} className={sorting}>
                {calendarData[prevYearAndMonth].map((value) => {
                    let videoData = prevMonthVideoData.get(
                        prevYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
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
                    let videoData = currentMonthVideoData.get(
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
                    let videoData = nextMonthVideoData.get(
                        nextYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
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
            </Wrapper>
            {sorting === "list" && (
                <GoUpButton onClick={onClickGoUpButton}>
                    <FaArrowUp />
                </GoUpButton>
            )}
        </>
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

const GoUpButton = styled.button`
    position: absolute;

    bottom: 2%;
    right: 14%;

    width: 3%;

    aspect-ratio: 1;

    background: ${mainRed};
    border-radius: 25%;

    & svg {
        fill: white;

        transform: scale(2);
    }
`;

export default DateCardContainer;
