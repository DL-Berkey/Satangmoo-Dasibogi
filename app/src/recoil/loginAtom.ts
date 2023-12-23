import { AtomEffect, atom } from "recoil";

const loginEffect: (key: string) => AtomEffect<boolean> =
    (key) =>
    ({ setSelf }) => {
        const authToken = localStorage.getItem(key);

        const isLogin = authToken !== null;

        setSelf(isLogin);
    };

const loginAtom = atom({
    key: "loginAtom",
    default: false,
    effects: [loginEffect("sb-xvoaffrwsehmxdoatduo-auth-token")],
});

export default loginAtom;
