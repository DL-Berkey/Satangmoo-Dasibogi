import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAccount from "@/hooks/useAccount";

const OAuthLogin = () => {
    const { updateLoginAtom } = useAccount();

    const navigate = useNavigate();

    useEffect(() => {
        updateLoginAtom().then(() => {
            navigate("/", { replace: true });
        });
    }, []);

    return null;
};

export default OAuthLogin;
