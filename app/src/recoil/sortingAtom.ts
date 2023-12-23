import { atom, AtomEffect } from "recoil";

const sortingEffect: (key: string) => AtomEffect<SortingMode> =
    (key) =>
    ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(key);

        if (
            savedValue !== null &&
            (savedValue === "calendar" || savedValue === "list")
        ) {
            setSelf(savedValue);
        }

        onSet((newValue) => {
            localStorage.setItem(key, newValue);
        });
    };

const sortingAtom = atom<SortingMode>({
    key: "sortingAtom",
    default: "calendar",
    effects: [sortingEffect("sortingMode")],
});

export default sortingAtom;
