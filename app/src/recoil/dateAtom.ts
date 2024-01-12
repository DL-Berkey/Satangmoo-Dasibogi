import { atom } from "recoil";
import dayjs from "dayjs";

const dateAtom = atom({
    key: "dateAtom",
    default: dayjs(),
});

export default dateAtom;
