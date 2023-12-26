import { useQuery } from "@tanstack/react-query";
import supabase from "@/supabaseConfig/client";

const useAccount = () => {
    const query = useQuery({
        queryKey: ["userData"],
        queryFn: () => supabase.auth.getSession(),
        select: (value) => {
            if (value.data.session) {
                return value.data.session.user;
            } else {
                return null;
            }
        },
        staleTime: Infinity,
        gcTime: Infinity,
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

    return { userDataQuery: query, login, logout };
};

export default useAccount;
