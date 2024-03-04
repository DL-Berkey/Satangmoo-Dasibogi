import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import sortingAtom from "@/recoil/sortingAtom";
import CalendarNavigation from "./CalendarNavigation";
import ErrorBoundary from "../error/ErrorBoundary";
import Loading from "../Loading";
import DayOfWeekCardContainer from "./DayOfWeekCardContainer";
import CalendarCardContainer from "./calendarMode/CalendarCardContainer";
import ListCardContainer from "./listMode/ListCardContainer";
import GoUpButton from "../GoUpButton";
import Popup from "../Popup";
import { gray2 } from "@/styles/colors";

const DAY_OF_WEEK_MAP: Record<DAY_OF_WEEK, string> = {
    sunday: "일요일",
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
} as const;

const MainPage = () => {
    const sortingMode = useRecoilValue(sortingAtom);

    return (
        <Wrapper>
            <ErrorBoundary>
                <CalendarNavigation />
                <DayOfWeekCardContainer dayOfWeekMap={DAY_OF_WEEK_MAP} />
                <Suspense fallback={<Loading />}>
                    {sortingMode === "calendar" ? (
                        <CalendarCardContainer />
                    ) : (
                        <ListCardContainer />
                    )}
                </Suspense>
            </ErrorBoundary>
            <GoUpButton />
            <Popup />
        </Wrapper>
    );
};

const Wrapper = styled.section`
    border-bottom: 3px solid ${gray2};
`;

export default MainPage;
