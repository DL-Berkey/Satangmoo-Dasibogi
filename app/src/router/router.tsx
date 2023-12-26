import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Layout from "@/components/Layout";
import Calendar from "@/components/calendar/Calendar";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Calendar />} />
        </Route>
    )
);

export default router;
