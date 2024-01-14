import { MouseEvent } from "react";
import styled, { css } from "styled-components";

import { FaBookmark } from "react-icons/fa";

import useAccount from "@/hooks/useAccount";
import useBookmark from "@/hooks/bookmark/useBookmark";
import useCalendar from "@/hooks/useCalendar";
import { mainRed } from "@/styles/colors";

interface Props {
    videoData: VideoData;
    className?: string;
}

const BookmarkButton = ({ videoData, className }: Props) => {
    const { isLogin } = useAccount();

    const bookmark = useBookmark();

    const { isCurrentMonth } = useCalendar();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const videoId = e.currentTarget.getAttribute("videoid");

        if (bookmark && videoId) {
            bookmark.updateBookmark(videoData);
        }
    };

    return (
        <>
            {isLogin() && isCurrentMonth(videoData.publishedAt as FullDate) && (
                <Wrapper
                    className={className}
                    $isBookmarked={bookmark.isBookmarkVideo(videoData)}
                    videoid={videoData.videoId}
                    onClick={onClick}
                >
                    <FaBookmark />
                </Wrapper>
            )}
        </>
    );
};

const Wrapper = styled.button<{ videoid: string; $isBookmarked?: boolean }>`
    width: 30%;
    height: 100%;

    & svg {
        float: right;

        transform: scale(1.2);

        fill: white;

        ${(props) =>
            props.$isBookmarked &&
            css`
                fill: ${mainRed};
            `}
    }
`;

export default BookmarkButton;
