import { atom, AtomEffect } from "recoil";

const showBookmarkedOnlyEffect: (
    key: string
) => AtomEffect<"show" | "noShow"> =
    (key) =>
    ({ setSelf, onSet }) => {
        let savedValue = localStorage.getItem(key);

        if (savedValue && (savedValue === "show" || savedValue === "noShow")) {
            setSelf(savedValue);
        }

        onSet((newValue, _, isReset) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, newValue);
        });
    };

const showBookmarkedOnlyAtom = atom<"show" | "noShow">({
    key: "showBookmarkedOnlyAtom",
    default: "noShow",
    effects: [showBookmarkedOnlyEffect("showBookmarkedOnly")],
});

export default showBookmarkedOnlyAtom;
