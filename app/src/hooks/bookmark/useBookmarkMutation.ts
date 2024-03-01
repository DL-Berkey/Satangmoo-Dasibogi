import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MUTATION_KEY, QUERY_KEY } from "@/constants/queryKeys";
import supabase from "@/supabaseConfig/client";

interface MutationParams {
    userId: string;
    yearAndMonth: YearAndMonth;
    videoData: VideoData;
}

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

export const useAddingBookmark = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: [MUTATION_KEY.adding_bookmark],
        mutationFn: ({ userId, videoData }: MutationParams) => {
            const videoId = videoData.videoId;

            return addBookmarkVideo(userId, videoId);
        },
        onMutate: async ({ userId, yearAndMonth, videoData }) => {
            // 캐시된 bookmark video data의 query를 취소
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });

            // 캐시된 bookmark video를 가져옴
            const previousBookmarks = queryClient.getQueryData<MonthlyVideo>([
                QUERY_KEY.bookmark_video,
                userId,
                yearAndMonth,
            ]);

            if (!previousBookmarks) {
                return;
            }

            // 유저가 추가적으로 북마크한 video data를 추가한 새로운 bookmark video data를 만들어서 기존의 bookmark query에 등록
            const fullDate = videoData.publishedAt as FullDate;

            const newBookmarks = new Map(previousBookmarks.entries());

            newBookmarks.set(fullDate, videoData);

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],

                newBookmarks
            );

            return { previousBookmarks };
        },

        onError: (error, variables, context) => {
            console.error(error);

            if (!context) {
                return;
            }

            const { userId, yearAndMonth } = variables;

            const { previousBookmarks } = context;

            // mutate 실패시(서버의 데이터 변경이 실패) 원래의 bookmark video data로 bookmark query를 변경
            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],
                previousBookmarks
            );
        },
        onSettled: (_, __, variables, ___) => {
            const { userId, yearAndMonth } = variables;

            // 실패했던, 성공했던 bookmark query를 refetch
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });
        },
    });

    return mutation;
};

export const useRemovingBookmark = () => {
    const queryClient = useQueryClient();

    const removingMutation = useMutation({
        mutationKey: [MUTATION_KEY.removing_bookmark],
        mutationFn: ({ userId, videoData }: MutationParams) => {
            const videoId = videoData.videoId;

            return removeBookmarkVideo(userId, videoId);
        },
        onMutate: async ({ userId, yearAndMonth, videoData }) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });

            const previousBookmarks = queryClient.getQueryData<
                Map<FullDate, VideoData>
            >([QUERY_KEY.bookmark_video, userId, yearAndMonth]);

            if (!previousBookmarks) {
                return;
            }

            const fullDate = videoData.publishedAt as FullDate;

            const newBookmarks = new Map(previousBookmarks.entries());

            if (!newBookmarks.has(fullDate)) {
                return;
            }

            newBookmarks.delete(fullDate);

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],
                newBookmarks
            );

            return { previousBookmarks };
        },

        onError: (error, variables, context) => {
            console.error(error);

            if (!context) {
                return;
            }

            const { userId, yearAndMonth } = variables;

            const { previousBookmarks } = context;

            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video, userId, yearAndMonth],
                previousBookmarks
            );
        },
        onSettled: (_, __, variables, ___) => {
            const { userId, yearAndMonth } = variables;

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.bookmark_video, userId, yearAndMonth],
            });
        },
    });

    return removingMutation;
};
