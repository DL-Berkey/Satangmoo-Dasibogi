import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

import dayjs from "dayjs";

// YouTube API Key
const API_KEY = import.meta.env.VITE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const getVideos = async (startingDate: string, endDate: string) =>
    await axios.get<YoutubeResponse>(
        "https://www.googleapis.com/youtube/v3/search",
        {
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: "snippet",
                order: "date",
                maxResults: 31,
                publishedAfter: dayjs(startingDate)
                    .add(9, "hour")
                    .toISOString(),
                publishedBefore: dayjs(endDate)
                    .add(9, "hour")
                    .add(1, "day")
                    .toISOString(),
            },
        }
    );

const useVideo = (startingDate: string, endDate: string) => {
    const query = useSuspenseQuery({
        queryKey: ["video", startingDate, endDate],
        queryFn: () => getVideos(startingDate, endDate),
        select: (data) => {
            const videoData: Record<
                string,
                { snippet: Snippet; videoId: string }
            > = {};

            data.data.items.forEach((value) => {
                const publishedAt = dayjs(value.snippet.publishedAt)
                    .subtract(9, "hour")
                    .format("YYYY-MM-D");

                videoData[publishedAt] = {
                    snippet: value.snippet,
                    videoId: value.id.videoId,
                };
            });

            return videoData;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return query;
};

export default useVideo;
