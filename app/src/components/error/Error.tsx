import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import styled from "styled-components";

import errorImage from "@/assets/sadtangmoo.png";
import { mainRed } from "@/styles/colors";
import { bigSize, mediumSize } from "@/styles/fontSize";

interface Props {
    resetErrorBoundary(): void;
}

const Error = ({ resetErrorBoundary }: Props) => {
    const { reset } = useQueryErrorResetBoundary();

    const onClick = () => {
        reset();
        resetErrorBoundary();
    };

    return (
        <Wrapper>
            <ErrorImage src={errorImage} alt="error image" />
            <ErrorMessage>알 수 없는 문제가 발생했습니다...</ErrorMessage>
            <ResetButton onClick={onClick}>다시 불러오기</ResetButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    place-content: center;

    height: 100%;

    padding-bottom: 10%;
`;

const ErrorImage = styled.img`
    width: 50%;

    margin: 0 auto;

    aspect-ratio: 1;
`;

const ErrorMessage = styled.p`
    margin: 0 auto;

    font-size: ${bigSize};

    margin-bottom: 6%;
`;

const ResetButton = styled.button`
    width: 40%;

    margin: 0 auto;
    padding: 1%;

    font-size: ${mediumSize};
    color: white;

    background: ${mainRed};
    border-radius: 10px;
`;

export default Error;
