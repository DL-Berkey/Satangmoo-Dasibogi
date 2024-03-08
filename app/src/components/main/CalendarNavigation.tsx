import { useState, useEffect, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";

import { GrPrevious, GrNext } from "react-icons/gr";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";

import useCalendar from "@/hooks/useCalendar";
import sortingAtom from "@/recoil/sortingAtom";
import usePopup from "@/hooks/usePopup";
import ShowBookmarkedOnlyVideo from "./ShowBookmarkedOnlyVideo";
import {
    NavigateMonthMedia,
    datePickerMedia,
    sortingMenuMedia,
} from "@/styles/media";

const CalendarNavigation = () => {
    const { date, changeCurrentMonth, goPrevMonth, goNextMonth } =
        useCalendar();

    const [isVisibleDatePicker, setIsVisibleDatePicker] = useState(false);

    const [sortingMode, setSortingMode] = useRecoilState(sortingAtom);

    const { registerPopup } = usePopup();

    // date가 변경 되었을 때 date picker가 켜져 있다면 꺼줌
    useEffect(() => {
        if (isVisibleDatePicker) {
            setIsVisibleDatePicker(false);
        }
    }, [date]);

    const onClickSortingButton = () => {
        setSortingMode((prev) => (prev === "calendar" ? "list" : "calendar"));
    };

    const onClickYearAndMonth = () => {
        setIsVisibleDatePicker((prev) => !prev);
    };

    const onChangeDatePicker = (e: ChangeEvent<HTMLInputElement>) => {
        const date = e.target.valueAsDate;

        if (!date) {
            return;
        }

        changeCurrentMonth(date);
        setIsVisibleDatePicker((prev) => !prev);
    };

    return (
        <Wrapper>
            <SortingMenu>
                <SortingButton
                    onClick={onClickSortingButton}
                    $active={sortingMode === "calendar"}
                >
                    <FaRegCalendarAlt />
                    <span>달력으로 보기</span>
                </SortingButton>
                <SortingButton
                    onClick={onClickSortingButton}
                    $active={sortingMode === "list"}
                >
                    <FaRegListAlt />
                    <span>목록으로 보기</span>
                </SortingButton>
            </SortingMenu>
            <NavigateMonthButton onClick={goPrevMonth}>
                <GrPrevious />
            </NavigateMonthButton>
            <h2
                onClick={onClickYearAndMonth}
                {...registerPopup(
                    "여기를 클릭하면 원하는 달로 바로 가실 수 있습니다."
                )}
            >
                {date.format("YYYY년 MM월")}
            </h2>
            <NavigateMonthButton onClick={goNextMonth}>
                <GrNext />
            </NavigateMonthButton>
            {isVisibleDatePicker && (
                <DatePicker
                    type="month"
                    value={date.format("YYYY-MM")}
                    onChange={onChangeDatePicker}
                />
            )}

            <ShowBookmarkedOnlyVideo />
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;

    height: 8vh;

    h2 {
        width: fit-content;

        font-size: ${({ theme }) => theme.fontSize.big};
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
    justify-content: space-between;
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

        background: ${({ theme }) => theme.color.gray};

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

    font-size: ${({ theme }) => theme.fontSize.small};

    animation: border-bottom;

    &::after {
        content: "";

        position: absolute;
        top: 100%;
        left: 50%;

        width: 0;
        height: 2px;

        background: ${({ theme }) => theme.color.mainRed};

        transition: width 0.2s, left 0.2s;
    }

    & svg {
        fill: ${({ theme }) => theme.color.mainRed};
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

const NavigateMonthButton = styled.button`
    width: 4%;
    height: 90%;

    & svg {
        transform: scale(3);
    }

    &:hover {
        & svg {
            color: ${({ theme }) => theme.color.mainRed};
        }
    }

    ${NavigateMonthMedia};
`;

const DatePicker = styled.input`
    position: absolute;
    top: 80%;
    left: 50%;

    transform: translate(-50%);

    width: 15%;
    height: 50%;

    padding: 1%;

    font-size: ${({ theme }) => theme.fontSize.small};

    border: 2px solid ${({ theme }) => theme.color.mainRed};
    border-radius: 10px;

    z-index: 1;

    ${datePickerMedia};
`;

export default CalendarNavigation;
