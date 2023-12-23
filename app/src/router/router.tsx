import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Layout from "@/components/Layout";
import Calendar from "@/components/calendar/Calendar";
import OAuthLogin from "@/components/account/OAuthLogin";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Calendar />} />
            </Route>
            <Route path="/account/oauth" element={<OAuthLogin />} />
        </Route>
    )
);

export default router;
