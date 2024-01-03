import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MUTATION_KEY, QUERY_KEY } from "@/constants/querykeys";
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

const useBookmarkMutation = (userId: string | null) => {
    // optimistic update를 위한 캐시 조작을 위한 queryclient
    const queryClient = useQueryClient();

    const updateBookmarkVideoQuery = ({
        prevBookmarkVideoIds,
        action,
        videoId,
    }: {
        prevBookmarkVideoIds: string[];
        action: "add" | "remove";
        videoId: string;
    }) => {
        if (action === "add") {
            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video_ids, userId],
                [...prevBookmarkVideoIds, videoId]
            );
        } else {
            queryClient.setQueryData(
                [QUERY_KEY.bookmark_video_ids, userId],
                prevBookmarkVideoIds.filter((value) => value !== videoId)
            );
        }
    };

    const mutation = useMutation({
        mutationKey: [MUTATION_KEY.on_bookmarking],
        mutationFn: ({
            action,
            videoId,
        }: {
            action: "add" | "remove";
            videoId: string;
        }) => {
            if (action === "add") {
                return addBookmarkVideo(userId, videoId);
            }
            return removeBookmarkVideo(userId, videoId);
        },
        onMutate: async ({ action, videoId }) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.bookmark_video_ids, userId],
            });

            const prevBookmarkVideoIds = queryClient.getQueryData<string[]>([
                QUERY_KEY.bookmark_video_ids,
                userId,
            ]);

            if (!prevBookmarkVideoIds) {
                return;
            }

            updateBookmarkVideoQuery({
                prevBookmarkVideoIds,
                action,
                videoId,
            });

            return { prevBookmarkVideoIds };
        },
        onError: (error, { action, videoId }, context) => {
            console.error(error);

            if (!context) {
                return;
            }

            const { prevBookmarkVideoIds } = context;

            updateBookmarkVideoQuery({
                action,
                videoId,
                prevBookmarkVideoIds,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.bookmark_video_ids, userId],
            });
        },
    });

    return mutation;
};

export default useBookmarkMutation;
