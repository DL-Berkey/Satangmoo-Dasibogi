import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { GrPrevious, GrNext } from "react-icons/gr";

import { bigSize } from "@/styles/fontSize";
import { gray2, mainRed } from "@/styles/colors";
import DayOfWeekCardContainer from "./DayOfWeekCardContainer";
import DateCardContainer from "./DateCardContainer";

const DAY_OF_WEEK_MAP: Record<DAY_OF_WEEK, string> = {
    sunday: "일요일",
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
} as const;

/**
 *
 * @param startingDayOfWeek 이번 달 시작일의 요일
 * @param endDateOfCurrentMonth 이번 달 마지막 일
 * @param endDayOfLastMonth 저번 달의 마지막 일
 */
const createCalendarArray = (
    startingDayOfWeek: number,
    endDateOfCurrentMonth: number,
    endDateOfLastMonth: number
) => {
    let day = 1;
    const monthArray = Array(42)
        .fill(undefined)
        .map((_, idx) => {
            if (idx < startingDayOfWeek) {
                return endDateOfLastMonth - (startingDayOfWeek - 1 - idx);
            }

            if (day > endDateOfCurrentMonth) {
                day = 1;
            }

            return day++;
        })
        .reduce((prev: number[][], current, idx) => {
            // 행 인덱스 계산
            const rowIndex = Math.floor(idx / 7);

            if (!prev[rowIndex]) {
                // 행이 아직 생성되지 않은 경우, 행을 추가
                prev[rowIndex] = [];
            }

            // 각 요소에 값을 추가
            prev[rowIndex].push(current);

            return prev;
        }, []);

    return monthArray;
};

const Calendar = () => {
    const [current, setCurrent] = useState(dayjs());

    // day of week: 요일, date: 일
    // 일요일: 0, 토요일: 6
    // 이번 달의 시작하는 요일
    const firstDayOfMonth = current.startOf("month");
    const startingDayOfWeek = firstDayOfMonth.day();

    // 이번 달의 마지막 일
    const endDateOfMonth = current.endOf("month");
    const endDate = endDateOfMonth.date();

    // 저번 달의 마지막 일
    const endDateOfLastMonth = current
        .subtract(1, "month")
        .endOf("month")
        .date();

    const calendarArray = createCalendarArray(
        startingDayOfWeek,
        endDate,
        endDateOfLastMonth
    );

    return (
        <Wrapper>
            <Navigation>
                <Button
                    onClick={() =>
                        setCurrent((prev) => prev.subtract(1, "month"))
                    }
                >
                    <GrPrevious />
                </Button>
                <h2>{current.format("YYYY 년 MM 월")}</h2>
                <Button
                    onClick={() => setCurrent((prev) => prev.add(1, "month"))}
                >
                    <GrNext />
                </Button>
            </Navigation>
            <DayOfWeekCardContainer dayOfWeekMap={DAY_OF_WEEK_MAP} />
            <DateCardContainer calendarArray={calendarArray} />
        </Wrapper>
    );
};

const Wrapper = styled.section`
    height: 100%;

    border-bottom: 2px solid ${gray2};
`;

const Navigation = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;

    height: 10%;

    h2 {
        width: fit-content;

        font-size: ${bigSize};
    }
`;

const Button = styled.button`
    width: 4%;

    & svg {
        transform: scale(3);
    }

    &:hover {
        & svg {
            color: ${mainRed};
        }
    }
`;

export default Calendar;
