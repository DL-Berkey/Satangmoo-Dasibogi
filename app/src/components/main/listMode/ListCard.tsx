import dayjs from "dayjs";
import styled from "styled-components";

import BookmarkButton from "../BookmarkButton";

interface Props {
    videoData: VideoData;
}

const ListCard = ({ videoData }: Props) => {
    const onClick = () => {
        const videoId = videoData.videoId;

        if (videoId) {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
        }
    };

    return (
        <Wrapper onClick={onClick}>
            <Thumbnail $thumbnail={videoData.thumbnails.high.url} />
            <Detail>
                <p>{dayjs(videoData.publishedAt).format("YYYY년 M월 D일")}</p>
                <p>{videoData.title}</p>
            </Detail>
            <CustomBookmarkButton videoData={videoData} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;

    display: flex;

    width: 90%;
    height: 24%;

    margin: 0 auto;

    background: white;

    border-radius: 10px;

    overflow: hidden;

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    & + & {
        margin-top: 4%;
    }
`;

const CustomBookmarkButton = styled(BookmarkButton)`
    position: absolute;
    top: 0;
    right: 0;

    width: 6%;
    height: 30%;

    & svg {
        float: none;

        transform: scale(2.2);

        stroke: black;
        stroke-width: 5px;
    }
`;

const Thumbnail = styled.div.attrs<{
    $thumbnail: string;
}>((props) => ({
    style: {
        background: `url(${props.$thumbnail}) center/cover no-repeat`,
    },
}))`
    width: 40%;

    aspect-ratio: 16 / 9;
`;

const Detail = styled.div`
    flex: 1;

    padding: 2%;

    & :first-child {
        width: fit-content;

        margin-bottom: 4%;

        font-size: ${({ theme }) => theme.fontSize.medium};

        border-bottom: 2px solid ${({ theme }) => theme.color.mainRed};
    }
    & :last-child {
        font-size: ${({ theme }) => theme.fontSize.small};
    }
`;

export default ListCard;
