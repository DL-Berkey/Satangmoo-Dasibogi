import { atom, AtomEffect } from "recoil";

const sortingAtomEffect: (key: string) => AtomEffect<SortingMode> =
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
    effects: [sortingAtomEffect("sortingMode")],
});

export default sortingAtom;
