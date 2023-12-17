import { useRecoilValue } from "recoil";
import styled from "styled-components";

import sortingAtom from "@/recoil/sortingAtom";
import image from "@/assets/sadtangmoo.png";
import { bigSize } from "@/styles/fontSize";

const EmptyPage = () => {
    const sortingMode = useRecoilValue(sortingAtom);

    return (
        <Wrapper className={sortingMode}>
            <Image src={image} />
            <Message>다시보기가 없습니다...</Message>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    place-content: center;

    height: 100%;
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
