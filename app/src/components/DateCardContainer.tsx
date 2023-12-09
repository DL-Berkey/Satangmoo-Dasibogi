import styled from "styled-components";

import { FaRegHeart } from "react-icons/fa";

import { mainRed, gray2 } from "@/styles/colors";

interface Props {
    calendarArray: number[][];
}

const DateCardContainer = ({ calendarArray }: Props) => {
    return (
        <Wrapper>
            {calendarArray.map((outerValue) => {
                return outerValue.map((innerValue) => {
                    return (
                        <DateCard>
                            <Date>{innerValue}</Date>
                            <Like>
                                <FaRegHeart />
                            </Like>
                            <Thumbnail />
                        </DateCard>
                    );
                });
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1%;

    height: 80%;

    background-color: ${gray2};
`;

const DateCard = styled.div`
    display: grid;
    grid-template-areas:
        "date . like"
        "thumbnail thumbnail thumbnail";

    grid-template-rows: 1fr 3fr;

    height: 100%;

    padding: 2%;

    font-size: 1.2rem;

    background: white;
`;

const Date = styled.span`
    grid-area: date;

    width: fit-content;

    border-bottom: 2px solid ${mainRed};
`;

const Like = styled.button`
    grid-area: like;
`;

const Thumbnail = styled.img`
    grid-area: thumbnail;
`;

export default DateCardContainer;
