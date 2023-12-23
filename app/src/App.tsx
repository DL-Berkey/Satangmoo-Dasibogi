import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { RouterProvider } from "react-router-dom";

import sortingAtom from "./recoil/sortingAtom";
import router from "./router/router";
import LoginModal from "@/components/LoginModal";

function App() {
    const resetSortingAtom = useResetRecoilState(sortingAtom);

    useEffect(() => {
        const resetSorting = () => {
            resetSortingAtom();
        };

        window.addEventListener("resize", resetSorting);

        return () => window.removeEventListener("resize", resetSorting);
    }, []);

    return (
        <>
            <RouterProvider router={router} />
            <LoginModal />
        </>
    );
}

export default App;
