import { MouseEvent } from "react";
import styled, { css } from "styled-components";

import { FaRegHeart } from "react-icons/fa";

import { useFetchingAllVideo } from "@/hooks/useVideo";
import createMonthPeriod from "@/utils/createMonthPeriod";
import { mainRed, gray2 } from "@/styles/colors";
import { bigSize } from "@/styles/fontSize";

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
    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        const name = e.currentTarget.getAttribute("name");

        if (name) {
            window.open(`https://www.youtube.com/watch?v=${name}`, "_blank");
        }
    };

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

    return (
        <Wrapper>
            {calendarData[prevYearAndMonth].map((value, idx) => {
                let thumbnailData = null;

                if (prevMonthVideoData) {
                    thumbnailData = prevMonthVideoData.get(
                        prevYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                return (
                    <DateCard
                        key={idx}
                        id="currentMonth"
                        name={thumbnailData?.videoId}
                        $thumbnail={thumbnailData?.thumbnails.high.url}
                        onClick={onClick}
                    >
                        <CardInfo>
                            <Date>{value}</Date>
                            <Like>
                                <FaRegHeart />
                            </Like>
                        </CardInfo>
                    </DateCard>
                );
            })}
            {calendarData[currentYearAndMonth].map((value, idx) => {
                let thumbnailData = null;

                if (currentMonthVideoData) {
                    thumbnailData = currentMonthVideoData.get(
                        currentYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                return (
                    <DateCard
                        key={idx}
                        id="currentMonth"
                        name={thumbnailData?.videoId}
                        $thumbnail={thumbnailData?.thumbnails.high.url}
                        onClick={onClick}
                    >
                        <CardInfo>
                            <Date>{value}</Date>
                            <Like>
                                <FaRegHeart />
                            </Like>
                        </CardInfo>
                    </DateCard>
                );
            })}
            {calendarData[nextYearAndMonth].map((value, idx) => {
                let thumbnailData = null;

                if (nextMonthVideoData) {
                    thumbnailData = nextMonthVideoData.get(
                        nextYearAndMonth +
                            "-" +
                            value.toString().padStart(2, "0")
                    );
                }

                return (
                    <DateCard
                        key={idx}
                        id="currentMonth"
                        name={thumbnailData?.videoId}
                        $thumbnail={thumbnailData?.thumbnails.high.url}
                        onClick={onClick}
                    >
                        <CardInfo>
                            <Date>{value}</Date>
                            <Like>
                                <FaRegHeart />
                            </Like>
                        </CardInfo>
                    </DateCard>
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

    @media (max-width: 1250px) {
        display: block;

        height: 100vh;

        overflow: scroll;
    }
`;

const DateCard = styled.div<{ name?: string; $thumbnail?: string }>`
    display: flex;
    justify-content: space-between;
    align-items: start;

    height: 100%;

    padding: 2% 3%;

    font-size: 1.2rem;
    color: ${(props) => props.$thumbnail && css`white`};

    background: ${(props) =>
        props.$thumbnail
            ? css`url(${props.$thumbnail}) center/cover no-repeat`
            : css`white`};

    & button svg {
        fill: ${(props) => props.$thumbnail && css`white`};
    }

    @media (max-width: 1250px) {
        width: 90%;
        height: 280px;

        margin: auto;

        font-size: ${bigSize};

        border: 2px solid ${mainRed};

        & + & {
            margin-top: 10%;
        }

        &#prevMonth,
        &#nextMonth {
            display: none;
        }
    }
`;

const CardInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 20%;

    @media (max-width: 1250px) {
        font-size: ${bigSize};

        & button svg {
            transform: scale(3);
        }
    }
`;

const Date = styled.span`
    width: fit-content;

    border-bottom: 2px solid ${mainRed};
`;

const Like = styled.button`
    width: 10%;

    & svg {
        transform: scale(1.2);
    }
`;

export default DateCardContainer;
