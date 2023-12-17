import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";

import popupAtom from "@/recoil/popupAtom";

const usePopup = (option?: {
    sortingMode: SortingMode;
    visibleMode: SortingMode | "all";
}) => {
    const setPopup = useSetRecoilState(popupAtom);

    const checkVisible = () => {
        if (!option) {
            return true;
        }

        if (option.visibleMode === "all") {
            return true;
        }

        if (option.sortingMode === option.visibleMode) {
            return true;
        }

        return false;
    };

    const onMouseEnterEvent =
        (text?: string) => (e: MouseEvent<HTMLDivElement>) => {
            const checkResult = checkVisible();

            if (!checkResult) {
                return;
            }

            const { right, y } = e.currentTarget.getBoundingClientRect();

            setPopup({
                isVisible: true,
                x: right,
                y,
                text,
            });
        };

    const onMouseLeaveEvent = () => () => {
        const checkResult = checkVisible();

        if (!checkResult) {
            return;
        }

        setPopup({
            isVisible: false,
            x: 0,
            y: 0,
        });
    };

    const registerPopup = (text?: string) => {
        const onMouseEnter = onMouseEnterEvent(text);
        const onMouseLeave = onMouseLeaveEvent();

        return { onMouseEnter, onMouseLeave };
    };

    return { registerPopup };
};

export default usePopup;
