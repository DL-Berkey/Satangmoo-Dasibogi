import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { useFetchingAllVideo } from "@/hooks/useVideo";
import sortingAtom from "@/recoil/sortingAtom";
import createMonthPeriod from "@/utils/createMonthPeriod";
import DateCard from "./DateCard";
import { gray2 } from "@/styles/colors";
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

    return (
        <Wrapper className={sorting}>
            {calendarData[prevYearAndMonth].map((value) => {
                let videoData = undefined;

                if (prevMonthVideoData) {
                    videoData = prevMonthVideoData.get(
                        prevYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                // sorting mode가 list면 렌더링하지 않음
                if (sorting === "list") {
                    return null;
                }

                return (
                    <DateCard
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
            {calendarData[currentYearAndMonth].map((value) => {
                let videoData = undefined;

                if (currentMonthVideoData) {
                    videoData = currentMonthVideoData.get(
                        currentYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                if (sorting === "list" && videoData === undefined) {
                    return null;
                }

                return (
                    <DateCard
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
            {calendarData[nextYearAndMonth].map((value) => {
                let videoData = undefined;

                if (nextMonthVideoData) {
                    videoData = nextMonthVideoData.get(
                        nextYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                // sorting mode가 list면 렌더링하지 않음
                if (sorting === "list") {
                    return null;
                }

                return (
                    <DateCard
                        key={value}
                        date={String(value)}
                        videoData={videoData}
                        sortingMode={sorting}
                    />
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
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
