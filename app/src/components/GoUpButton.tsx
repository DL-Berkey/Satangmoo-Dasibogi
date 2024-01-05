import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { FaArrowUp } from "react-icons/fa";

import sortingAtom from "@/recoil/sortingAtom";
import { mainRed } from "@/styles/colors";
import { goUpButtonMedia } from "@/styles/media";

const GoUpButton = () => {
    const sortingMode = useRecoilValue(sortingAtom);

    const onClickGoUpButton = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {sortingMode === "list" && (
                <Wrapper onClick={onClickGoUpButton}>
                    <FaArrowUp />
                </Wrapper>
            )}
        </>
    );
};

const Wrapper = styled.button`
    position: fixed;

    bottom: 6%;
    right: 20%;

    display: block;

    height: 5%;

    aspect-ratio: 1;

    background: ${mainRed};
    border-radius: 25%;

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    & svg {
        fill: white;

        transform: scale(2);
    }

    ${goUpButtonMedia}
`;

export default GoUpButton;
