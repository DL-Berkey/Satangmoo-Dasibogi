import { MouseEvent } from "react";
import dayjs from "dayjs";
import styled, { css } from "styled-components";

import { FaHeart } from "react-icons/fa";

import { mainRed } from "@/styles/colors";
import {
    cardInfoListMode,
    dateCardListMode,
    thumbnailListMode,
} from "@/styles/listMode";
import { cardInfoMedia, dateCardMedia } from "@/styles/media";
import { defaultSize, mediumSize } from "@/styles/fontSize";

interface Props {
    date: string;
    videoData?: VideoData;
    sortingMode: SortingMode;
}

const DateCard = ({ date, videoData, sortingMode }: Props) => {
    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        // const currentTarget = e.target as HTMLDivElement;
        // const videoid = currentTarget.getAttribute("videoid");
        const videoid = e.currentTarget.getAttribute("videoid");

        if (videoid) {
            window.open(`https://www.youtube.com/watch?v=${videoid}`, "_blank");
        }
    };

    const onClicklike = (e: MouseEvent) => {
        e.stopPropagation();

        // like logic...
    };

    return (
        <Wrapper
            className={sortingMode}
            videoid={videoData?.videoId}
            onClick={onClick}
        >
            <CardInfo
                className={sortingMode}
                $setTransparent={videoData?.thumbnails !== undefined}
            >
                {sortingMode === "calendar" && <Date>{date}</Date>}
                {videoData && (
                    <Like onClick={onClicklike}>
                        <FaHeart />
                    </Like>
                )}
            </CardInfo>

            <Thumbnail
                className={sortingMode}
                $thumbnail={videoData?.thumbnails.high.url}
            />
            {sortingMode === "list" && (
                <Detail>
                    <p>
                        {videoData?.publishedAt !== undefined &&
                            dayjs(videoData?.publishedAt).format(
                                "YYYY년 MM월 D일"
                            )}
                    </p>
                    <p>{videoData?.title}</p>
                </Detail>
            )}
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

    height: 100%;

    ${dateCardListMode}

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

            & button svg {
                fill: white;
            }
        `}

    ${cardInfoListMode}
        
    ${cardInfoMedia}
`;

const Date = styled.span`
    width: fit-content;

    border-bottom: 2px solid ${mainRed};
`;

const Like = styled.button`
    width: 30%;
    height: 100%;

    & svg {
        float: right;

        transform: scale(1.2);
    }
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
        return {
            style: {
                background: "transparent",
            },
        };
    }
})`
    aspect-ratio: 16 / 9;

    ${thumbnailListMode}
`;

const Detail = styled.div`
    flex: 1;

    padding: 2%;

    & :first-child {
        width: fit-content;

        margin-bottom: 4%;

        font-size: ${mediumSize};

        border-bottom: 2px solid ${mainRed};
    }
    & :last-child {
        font-size: ${defaultSize};
    }
`;

export default DateCard;
