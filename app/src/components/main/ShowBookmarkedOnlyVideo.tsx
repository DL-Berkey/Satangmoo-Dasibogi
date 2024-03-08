import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import { FaBookmark } from "react-icons/fa";

import sortingAtom from "@/recoil/sortingAtom";
import useAccount from "@/hooks/useAccount";
import showBookmarkedOnlyAtom from "@/recoil/showBookmarkedOnlyAtom";

const ShowBookmarkedOnlyVideo = () => {
    const sortingMode = useRecoilValue(sortingAtom);

    const { userDataQuery } = useAccount();

    const [ShowBookmarkedOnly, setShowBookmarkedOnly] = useRecoilState(
        showBookmarkedOnlyAtom
    );

    const onClick = () => {
        setShowBookmarkedOnly((prev) => (prev === "show" ? "noShow" : "show"));
    };

    return (
        <>
            {sortingMode === "list" && userDataQuery.data && (
                <Wrapper>
                    <Button
                        $isShow={ShowBookmarkedOnly === "show"}
                        onClick={onClick}
                    >
                        <FaBookmark />
                        <div>
                            <span>북마크한 영상</span>
                            <span>만 보기</span>
                        </div>
                    </Button>
                </Wrapper>
            )}
        </>
    );
};

const Wrapper = styled.div`
    position: absolute;

    top: 0;
    right: 2%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8%;

    width: 22%;
    height: 100%;
`;

const Button = styled.button<{ $isShow: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 62%;
    height: 40%;

    padding: 0 3%;

    font-size: ${({ theme }) => theme.fontSize.small};

    & svg {
        fill: white;

        stroke: black;
        stroke-width: 5px;

        transition: fill 0.3s;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

        ${(props) =>
            props.$isShow &&
            css`
                fill: ${({ theme }) => theme.color.mainRed};
            `}
    }

    & div :first-child {
        color: ${({ theme }) => theme.color.mainRed};
    }
`;

export default ShowBookmarkedOnlyVideo;
