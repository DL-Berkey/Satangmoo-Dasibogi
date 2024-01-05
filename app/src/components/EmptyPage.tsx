import styled from "styled-components";

import image from "@/assets/sadtangmoo.png";
import { bigSize } from "@/styles/fontSize";
import { emptyPageMedia } from "@/styles/media";

const EmptyPage = () => {
    return (
        <Wrapper>
            <Image src={image} />
            <Message>다시보기가 없습니다...</Message>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    place-content: center;

    height: 83vh;

    ${emptyPageMedia}
`;

const Image = styled.img`
    width: 50%;

    margin: 0 auto;

    aspect-ratio: 1;
`;

const Message = styled.p`
    margin: 0 auto;

    font-size: ${bigSize};

    margin-bottom: 10%;
`;

export default EmptyPage;
