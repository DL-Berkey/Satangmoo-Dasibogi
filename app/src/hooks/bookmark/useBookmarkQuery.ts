import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/querykeys";
import supabase from "@/supabaseConfig/client";

// supabase에서 user Id로 사용자가 북마크한 영상을 video id 배열로 가져오는 함수
const getBookmarkVideoIds = async (userId: string) => {
    // video_id[] 타입으로 supabase에서 데이터를 가져오는 functions
    const { data, error } = await supabase.rpc("get_likes_video_by_user_id", {
        user_id_input: userId,
    });

    if (error) {
        throw error;
    }

    // 중복된 video id를 제거하기 위해 set으로 변환 후 다시 array로 변환
    return [...new Set(data[0].video_ids)];
};

const useBookmarkQuery = (userId: string | null) => {
    const query = useSuspenseQuery({
        queryKey: [QUERY_KEY.bookmark_video_ids, userId],
        queryFn: () => {
            // 유저가 로그인하지 않아서 userId가 null이면 null을 리턴
            if (!userId) {
                return null;
            }

            return getBookmarkVideoIds(userId);
        },
    });

    if (query.error) {
        throw query.error;
    }

    return query;
};

export default useBookmarkQuery;
