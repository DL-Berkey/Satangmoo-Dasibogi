import styled, { css } from "styled-components";

import { mainRed } from "@/styles/colors";

interface Props {
    dayOfWeekMap: Record<DAY_OF_WEEK, string>;
}

const DayOfWeekCardContainer = ({ dayOfWeekMap }: Props) => {
    return (
        <Wrapper>
            {Object.entries(dayOfWeekMap).map(([key, value]) => {
                return (
                    <DayOfWeekCard
                        key={key}
                        $isholiday={key === "sunday" || key === "saturday"}
                    >
                        {value}
                    </DayOfWeekCard>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1%;

    height: 5%;

    @media (max-width: 1250px) {
        display: none;
    }
`;

const DayOfWeekCard = styled.div<{
    $isholiday: boolean;
}>`
    width: 100%;

    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 3px;

    ${(props) =>
        props.$isholiday &&
        css`
            color: ${mainRed};
        `}
`;

export default DayOfWeekCardContainer;
