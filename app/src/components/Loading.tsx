import styled from "styled-components";

import { ImSpinner8 } from "react-icons/im";

const Loading = () => {
    return (
        <Wrapper>
            <ImSpinner8 />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;

    width: 100%;
    height: 85%;

    @keyframes spin {
        0% {
            transform: scale(5) rotate(0deg);
        }
        100% {
            transform: scale(5) rotate(360deg);
        }
    }

    & svg {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        animation: spin 2s linear infinite;
    }
`;

export default Loading;
