import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useCalendar from "@/hooks/useCalendar";
import showBookmarkedOnlyAtom from "@/recoil/showBookmarkedOnlyAtom";
import useBookmark from "@/hooks/bookmark/useBookmark";
import { useFetchingVideo } from "@/hooks/useVideo";
import createMonthPeriod from "@/utils/createMonthPeriod";
import createFullDate from "@/utils/createFullDate";
import ListCard from "./ListCard";
import EmptyPage from "../../EmptyPage";

const ListCardContainer = () => {
    const showBookmarkedOnly = useRecoilValue(showBookmarkedOnlyAtom);

    const {
        monthDays,
        yearAndMonth: {
            prevYearAndMonth,
            currentYearAndMonth,
            nextYearAndMonth,
        },
    } = useCalendar();

    const { data, isBookmarkVideo } = useBookmark();

    const { currentMonthPeriod } = createMonthPeriod({
        currentYearAndMonth,
        prevYearAndMonth,
        nextYearAndMonth,
    });

    const query = useFetchingVideo(currentMonthPeriod);

    const isEmpty =
        query.data.size === 0 ||
        (showBookmarkedOnly === "show" && data && !(data.size > 0));

    return (
        <Wrapper>
            {[...monthDays[currentYearAndMonth]].reverse().map((value) => {
                const fullDate = createFullDate(currentYearAndMonth, value);

                let videoData = query.data.get(fullDate);

                if (videoData === undefined) {
                    return null;
                }

                if (
                    showBookmarkedOnly === "show" &&
                    !isBookmarkVideo(videoData)
                ) {
                    return null;
                }

                return <ListCard key={fullDate} videoData={videoData} />;
            })}
            {/* 목록으로 보기에서 다시보기 영상이 없거나, 북마크한 영상이 없을 때 띄우는 페이지 */}
            {isEmpty && <EmptyPage />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: block;
    width: 60%;
    min-height: 83vh;
    height: fit-content;

    margin: 0 auto;
    padding: 2% 0;

    background-color: ${({ theme }) => theme.color.gray2};
`;

export default ListCardContainer;
