import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import styled from "styled-components";

import errorImage from "@/assets/sadtangmoo.png";

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

    height: 91vh;

    padding-bottom: 10%;
`;

const ErrorImage = styled.img`
    width: 50%;

    margin: 0 auto;

    aspect-ratio: 1;
`;

const ErrorMessage = styled.p`
    margin: 0 auto;

    font-size: ${({ theme }) => theme.fontSize.big};

    margin-bottom: 6%;
`;

const ResetButton = styled.button`
    width: 40%;

    margin: 0 auto;
    padding: 1%;

    font-size: ${({ theme }) => theme.fontSize.medium};
    color: white;

    background: ${({ theme }) => theme.color.mainRed};
    border-radius: 10px;
`;

export default Error;
