import styled from "styled-components";

import { useFetchingAllVideo } from "@/hooks/useVideo";
import createMonthPeriod from "@/utils/createMonthPeriod";
import ListCard from "./ListCard";
import EmptyPage from "../../EmptyPage";
import { gray2 } from "@/styles/colors";

interface Props {
    prevYearAndMonth: YearAndMonth;
    currentYearAndMonth: YearAndMonth;
    nextYearAndMonth: YearAndMonth;
    calendarData: CalendarData;
}

const ListCardContainer = ({
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

    const { currentMonthQuery } = query;

    return (
        <Wrapper>
            {calendarData[currentYearAndMonth].map((value) => {
                let videoData = currentMonthQuery.data.get(
                    currentYearAndMonth +
                        "-" +
                        value.toString().padStart(2, "0")
                );

                if (videoData === undefined) {
                    return null;
                }

                return <ListCard key={value} videoData={videoData} />;
            })}
            {/* 목록으로 보기에서 다시보기 영상이 없을 때 띄우는 페이지 */}
            {currentMonthQuery.data.size === 0 && <EmptyPage />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: block;
    width: 60%;
    height: fit-content;

    margin: 0 auto;
    padding: 2% 0;

    background-color: ${gray2};
`;

export default ListCardContainer;
