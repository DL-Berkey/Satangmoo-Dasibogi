import { MouseEvent } from "react";
import styled, { css } from "styled-components";

import usePopup from "@/hooks/usePopup";
import BookmarkButton from "../BookmarkButton";
import { mainRed } from "@/styles/colors";
import { cardInfoMedia, dateCardMedia } from "@/styles/media";

interface Props {
    date: string;
    videoData?: VideoData;
}

const CalendarCard = ({ date, videoData }: Props) => {
    const { registerPopup } = usePopup();

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        const videoid = e.currentTarget.getAttribute("videoid");

        if (videoid) {
            window.open(`https://www.youtube.com/watch?v=${videoid}`, "_blank");
        }
    };

    return (
        <Wrapper
            videoid={videoData?.videoId}
            onClick={onClick}
            {...registerPopup(videoData?.title)}
        >
            <CardInfo $setTransparent={videoData?.thumbnails !== undefined}>
                <Date>{date + " 일"}</Date>
                {videoData && <BookmarkButton videoData={videoData} />}
            </CardInfo>

            <Thumbnail $thumbnail={videoData?.thumbnails.high.url} />
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    videoid: string | undefined;
}>`
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
