import { useState, useEffect, ChangeEvent } from "react";
import { Dayjs } from "dayjs";
import styled, { css } from "styled-components";

import { useRecoilState } from "recoil";

import { GrPrevious, GrNext } from "react-icons/gr";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";

import sortingAtom from "@/recoil/sortingAtom";
import { bigSize, defaultSize } from "@/styles/fontSize";
import { gray, mainRed } from "@/styles/colors";
import { sortingMenuMedia } from "@/styles/media";

interface Props {
    current: Dayjs;
    changeCurrent(date: Date): void;
    goPrevMonth(): void;
    goNextMonth(): void;
}

const CalendarNavigation = ({
    current,
    changeCurrent,
    goPrevMonth,
    goNextMonth,
}: Props) => {
    const [isVisibleDatePicker, setIsDatePicker] = useState(false);

    const [sorting, setSorting] = useRecoilState(sortingAtom);

    // current가 변경 되었을 때 date picker가 켜져 있다면 꺼줌
    useEffect(() => {
        if (isVisibleDatePicker) {
            setIsDatePicker(false);
        }
    }, [current]);

    const onClickSortingButton = () => {
        setSorting((prev) => (prev === "calendar" ? "list" : "calendar"));
    };

    const onClickYearAndMonth = () => {
        setIsDatePicker((prev) => !prev);
    };

    const onChangeDatePicker = (e: ChangeEvent<HTMLInputElement>) => {
        const date = e.target.valueAsDate;

        if (!date) {
            return;
        }

        changeCurrent(date);
        setIsDatePicker((prev) => !prev);
    };

    return (
        <Wrapper>
            <SortingMenu>
                <SortingButton
                    onClick={onClickSortingButton}
                    $active={sorting === "calendar"}
                >
                    <FaRegCalendarAlt />
                    <span>달력으로 보기</span>
                </SortingButton>
                <SortingButton
                    onClick={onClickSortingButton}
                    $active={sorting === "list"}
                >
                    <FaRegListAlt />
                    <span>목록으로 보기</span>
                </SortingButton>
            </SortingMenu>
            <Button onClick={goPrevMonth}>
                <GrPrevious />
            </Button>
            <h2 onClick={onClickYearAndMonth}>
                {current.format("YYYY년 MM월")}
            </h2>
            {isVisibleDatePicker && (
                <DatePicker
                    type="month"
                    value={current.format("YYYY-MM")}
                    onChange={onChangeDatePicker}
                />
            )}
            <Button onClick={goNextMonth}>
                <GrNext />
            </Button>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;

    height: 10%;

    h2 {
        width: fit-content;

        font-size: ${bigSize};
    }

    & h2:hover {
        cursor: pointer;
    }
`;

const SortingMenu = styled.div`
    position: absolute;

    top: 0;
    left: 2%;

    display: flex;
    align-items: center;
    gap: 8%;

    width: 22%;
    height: 100%;

    &::after {
        content: "";

        position: absolute;
        top: 50%;
        left: 50%;

        width: 3px;
        height: 30%;

        background: ${gray};

        transform: translate(-50%, -50%);
    }

    ${sortingMenuMedia}
`;
const SortingButton = styled.button<{ $active: boolean }>`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 50%;
    height: 40%;

    padding: 0 3%;

    font-size: ${defaultSize};

    animation: border-bottom;

    &::after {
        content: "";

        position: absolute;
        top: 100%;
        left: 50%;

        width: 0;
        height: 2px;

        background: ${mainRed};

        transition: width 0.2s, left 0.2s;
    }

    & svg {
        fill: ${mainRed};
    }

    ${(props) =>
        props.$active &&
        css`
            &::after {
                left: 0;

                width: 100%;
            }
        `}
`;

const Button = styled.button`
    width: 4%;
    height: 90%;

    & svg {
        transform: scale(3);
    }

    &:hover {
        & svg {
            color: ${mainRed};
        }
    }
`;

const DatePicker = styled.input`
    position: absolute;
    top: 80%;
    left: 50%;

    transform: translate(-50%);

    width: 15%;
    height: 50%;

    padding: 1%;

    font-size: ${defaultSize};

    border: 2px solid ${mainRed};
    border-radius: 10px;
`;

export default CalendarNavigation;