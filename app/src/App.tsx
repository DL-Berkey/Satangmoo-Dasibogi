import { useEffect } from "react";
import { useResetRecoilState } from "recoil";

import sortingAtom from "./recoil/sortingAtom";
import Layout from "./components/Layout";

function App() {
    const resetSortingAtom = useResetRecoilState(sortingAtom);

    useEffect(() => {
        const resetSorting = () => {
            resetSortingAtom();
        };

        window.addEventListener("resize", resetSorting);

        return () => window.removeEventListener("resize", resetSorting);
    }, []);

    return <Layout />;
}

export default App;
