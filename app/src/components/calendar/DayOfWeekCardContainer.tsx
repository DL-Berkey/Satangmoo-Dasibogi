import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import sortingAtom from "@/recoil/sortingAtom";
import { mainRed } from "@/styles/colors";
import { dayOfWeekCardContainerMedia } from "@/styles/media";

interface Props {
    dayOfWeekMap: Record<DAY_OF_WEEK, string>;
}

const DayOfWeekCardContainer = ({ dayOfWeekMap }: Props) => {
    const sorting = useRecoilValue(sortingAtom);

    return (
        <Wrapper $visible={"calendar" === sorting}>
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

const Wrapper = styled.div<{ $visible: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1%;

    height: 3vh;

    ${(props) =>
        !props.$visible &&
        css`
            display: none;
        `}

    ${dayOfWeekCardContainerMedia}
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
