import styled, { css } from "styled-components";

import usePopup from "@/hooks/usePopup";
import BookmarkButton from "../BookmarkButton";
import { mainRed } from "@/styles/colors";
import { cardInfoMedia, dateCardMedia } from "@/styles/media";

interface Props {
    fullDate: string;
    videoData?: VideoData;
}

const CalendarCard = ({ fullDate, videoData }: Props) => {
    const { registerPopup } = usePopup();

    const onClick = () => {
        const videoId = videoData?.videoId;

        if (videoId) {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
        }
    };

    return (
        <Wrapper onClick={onClick} {...registerPopup(videoData?.title)}>
            <CardInfo $setTransparent={videoData?.thumbnails !== undefined}>
                <Date>{fullDate + " 일"}</Date>
                {videoData && <BookmarkButton videoData={videoData} />}
            </CardInfo>

            <Thumbnail $thumbnail={videoData?.thumbnails.high.url} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;

    display: flex;

    font-size: 1.2rem;

    background: white;

    ${dateCardMedia}
`;

const CardInfo = styled.div<{ $setTransparent: boolean }>`
    position: absolute;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 22%;

    padding: 0 4%;

    // thumbnail이 있을 경우 불투명한 검은색 바탕색을 가짐
    ${(props) =>
        props.$setTransparent &&
        css`
            color: white;
            background: rgba(0, 0, 0, 0.4);
        `}

    ${cardInfoMedia}
`;

const Date = styled.span`
    width: fit-content;

    border-bottom: 2px solid ${mainRed};
`;

const Thumbnail = styled.div.attrs<{
    $thumbnail?: string;
}>((props) => {
    if (props.$thumbnail !== undefined) {
        return {
            style: {
                background: `url(${props.$thumbnail}) center/cover no-repeat`,
            },
        };
    } else {
        return {};
    }
})`
    width: 100%;

    aspect-ratio: 16 / 9;
`;

export default CalendarCard;
