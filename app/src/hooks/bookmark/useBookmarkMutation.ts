import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MUTATION_KEY, QUERY_KEY } from "@/constants/queryKeys";
import supabase from "@/supabaseConfig/client";

// TODO: supabase의 테이블명 및 funtions 이름 변경
// supabase의 likes_video 테이블에 사용자가 좋아요한 영상의 video id를 추가하는 함수
const addBookmarkVideo = async (userId: string | null, videoId: string) => {
    if (!userId) {
        return null;
    }

    const { data, error } = await supabase
        .from("likes_video")
        .insert([
            {
                user_id: userId,
                video_id: videoId,
            },
        ])
        .select();

    if (error) {
        throw error;
    }

    return data;
};

// TODO: supabase의 테이블명 및 funtions 이름 변경
// supabase의 likes_video 테이블에 사용자가 좋아요한 영상의 video id를 삭제하는 함수
const removeBookmarkVideo = async (userId: string | null, videoId: string) => {
    if (!userId) {
        return null;
    }

    const { data, error } = await supabase
        .from("likes_video")
        .delete()
        .eq("user_id", userId)
        .eq("video_id", videoId)
        .select();

    if (error) {
        throw error;
    }

    return data;
};

//TODO: yearAndMonthDate 를 다른 적절한 이름으로 수정
const useBookmarkMutation = (
    userId: string | null,
    yearAndMonth: YearAndMonth
) => {
    // optimistic update를 위한 캐시 조작을 위한 queryclient
    const queryClient = useQueryClient();

    const updateBookmarkVideoQuery = ({
        previousCalendarData,
        action,
        videoData,
    }: {
        previousCalendarData: Map<FullDate, VideoData>;
        action: "add" | "remove";
        videoData: VideoData;
    }) => {
        const date = videoData.publishedAt as FullDate;

        const newCalendarData = new Map(previousCalendarData.entries());

        if (action === "add") {
            newCalendarData.set(date, videoData);

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],

                newCalendarData
            );
        } else {
            newCalendarData.delete(date);

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],
                newCalendarData
            );
        }
    };

    const mutation = useMutation({
        mutationKey: [MUTATION_KEY.on_bookmarking],
        mutationFn: ({
            action,
            videoData,
        }: {
            action: "add" | "remove";
            videoData: VideoData;
        }) => {
            const videoId = videoData.videoId;

            if (action === "add") {
                return addBookmarkVideo(userId, videoId);
            }
            return removeBookmarkVideo(userId, videoId);
        },
        onMutate: async ({ action, videoData }) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });

            const previousCalendarData = queryClient.getQueryData<
                Map<FullDate, VideoData>
            >([QUERY_KEY.bookmark_video, userId, yearAndMonth]);

            if (!previousCalendarData) {
                return;
            }

            updateBookmarkVideoQuery({
                previousCalendarData,
                action,
                videoData,
            });

            return { previousCalendarData };
        },

        onError: (error, _, context) => {
            console.error(error);

            if (!context) {
                return;
            }

            const { previousCalendarData } = context;

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],

                previousCalendarData
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });
        },
    });

    return mutation;
};

export default useBookmarkMutation;
