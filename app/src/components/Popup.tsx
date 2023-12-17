import { useRecoilValue } from "recoil";
import styled from "styled-components";

import popupAtom from "@/recoil/popupAtom";
import { defaultSize } from "@/styles/fontSize";

const Popup = () => {
    const { isVisible, x, y, text } = useRecoilValue(popupAtom);

    return (
        <>
            {isVisible && text && (
                <Wrapper x={x} y={y}>
                    {text}
                </Wrapper>
            )}
        </>
    );
};

const Wrapper = styled.div.attrs<{ x: number; y: number }>((props) => ({
    style: {
        position: "absolute",

        top: String(props.y) + "px",
        left: String(props.x) + "px",
    },
}))`
    width: fit-content;

    padding: 1%;

    font-size: ${defaultSize};
    color: white;

    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export default Popup;
