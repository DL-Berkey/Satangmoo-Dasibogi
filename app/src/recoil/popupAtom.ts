import { atom } from "recoil";

const popupAtom = atom<{
    isVisible: boolean;
    x: number;
    y: number;
    text?: string;
}>({
    key: "popupAtom",
    default: {
        isVisible: false,
        x: 0,
        y: 0,
        text: "",
    },
});

export default popupAtom;
