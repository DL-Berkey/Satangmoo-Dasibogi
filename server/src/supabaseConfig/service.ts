import { VideoData } from "../types/youtubeResponse";
import supabase from "./client";
import dayjs from "dayjs";

export const createVideo = async (
    videoId: string,
    thumbnails: VideoData["snippet"]["thumbnails"],
    publishedAt: string,
    title: string
) => {
    // videoId를 통해서 DB에 동일한 데이터가 있는지 확인
    const checkDuplication = await supabase
        .from("video")
        .select()
        .eq("videoId", videoId);

    if (checkDuplication.error) {
        return { ok: false, message: "duplication check error" };
    }

    if (checkDuplication.data.length !== 0) {
        return {
            ok: false,
            message: `already existing videoData | ${videoId}`,
        };
    }

    const formattedPublishedAt = dayjs(publishedAt)
        .subtract(9, "hour")
        .format("YYYY-MM-DD");

    // video data 저장
    const createResult = await supabase.from("video").insert([
        {
            thumbnails: JSON.stringify(thumbnails),
            publishedAt: formattedPublishedAt,
            title,
            videoId,
        },
    ]);

    if (createResult.error) {
        return { ok: false, message: "creating error" };
    }

    return {
        ok: true,
        message: `${formattedPublishedAt}, ${videoId} | video creating success`,
    };
};
