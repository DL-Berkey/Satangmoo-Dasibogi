import { useSetRecoilState } from "recoil";
import supabase from "@/supabaseConfig/client";

import loginAtom from "@/recoil/loginAtom";

const useAccount = () => {
    const setLogin = useSetRecoilState(loginAtom);

    const updateLoginAtom = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        if (data !== null) {
            setLogin(true);

            return;
        }

        setLogin(false);
    };

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/account/oauth`,
            },
        });

        if (error) {
            throw error;
        }

        console.log("data", data);

        return data;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        setLogin(false);
    };

    return { updateLoginAtom, login, logout };
};

export default useAccount;
