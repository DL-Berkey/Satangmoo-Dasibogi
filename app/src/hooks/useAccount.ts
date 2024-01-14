import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKeys";
import supabase from "@/supabaseConfig/client";

const useAccount = () => {
    const query = useQuery({
        queryKey: [QUERY_KEY.user_data],
        queryFn: () => supabase.auth.getSession(),
        select: (value) => {
            if (value.data.session) {
                return value.data.session.user;
            } else {
                return null;
            }
        },
    });

    if (query.error) {
        throw query.error;
    }

    const login = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            throw error;
        }

        query.refetch();
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        query.refetch();
    };

    const isLogin = () => {
        return Boolean(query.data);
    };

    return { userDataQuery: query, login, logout, isLogin };
};

export default useAccount;
