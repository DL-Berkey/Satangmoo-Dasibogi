import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKeys";
import supabase from "@/supabaseConfig/client";
import { getEndDate, getStartingDate } from "@/utils/createMonthPeriod";

// supabase에서 video Id 배열과 yearAndMonth 값으로 북마크한 영상의 데어터를 가져오는 함수
const getBookmarkVideoByMonth = async (
    bookmarkVideoIdArray: string[],
    yearAndMonth: YearAndMonth
) => {
    // TODO: changes variable name to better name
    const startingDate = getStartingDate(yearAndMonth);
    const endDate = getEndDate(yearAndMonth);
    //

    const { data, error } = await supabase
        .from("video")
        .select()
        .in("videoId", bookmarkVideoIdArray)
        .gte("publishedAt", startingDate)
        .lte("publishedAt", endDate)
        .order("publishedAt", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    const result = new Map<string, VideoData>();

    data.forEach((value) => {
        const thumbnails: VideoData["thumbnails"] = JSON.parse(
            value.thumbnails
        );

        result.set(value.publishedAt, {
            ...value,
            thumbnails: thumbnails,
        });
    });

    return result;
};

// supabase에서 user Id로 사용자가 북마크한 영상을 video id 배열로 가져오는 함수
const getBookmarkVideo = async (userId: string, yearAndMonth: YearAndMonth) => {
    // video_id[] 타입으로 supabase에서 데이터를 가져오는 functions
    const { data, error } = await supabase.rpc("get_likes_video_by_user_id", {
        user_id_input: userId,
    });

    if (error) {
        throw error;
    }

    // 중복된 video id를 제거하기 위해 set으로 변환 후 다시 array로 변환
    const videoIdArray = [...new Set(data[0].video_ids)];

    const result = await getBookmarkVideoByMonth(videoIdArray, yearAndMonth);

    return result;
};

const useBookmarkQuery = (
    userId: string | null,
    yearAndMonth: YearAndMonth
) => {
    const query = useSuspenseQuery({
        queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
        queryFn: () => {
            // 유저가 로그인하지 않아서 userId가 null이면 null을 리턴
            if (!userId) {
                return null;
            }

            return getBookmarkVideo(userId, yearAndMonth);
        },
    });

    if (query.error) {
        throw query.error;
    }

    return query;
};

export default useBookmarkQuery;
