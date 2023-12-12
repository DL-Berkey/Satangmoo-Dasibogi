import axios from "axios";
import dayjs from "dayjs";

import { YoutubeResponse } from "../types/youtubeResponse";

const getVideoFromYoutube = (startingDate: string, endDate: string) =>
    axios.get<YoutubeResponse>("https://www.googleapis.com/youtube/v3/search", {
        params: {
            key: process.env.API_KEY,
            channelId: process.env.CHANNEL_ID,
            part: "snippet",
            order: "date",
            maxResults: 50,
            publishedAfter: dayjs(startingDate).add(9, "hour").toISOString(),
            publishedBefore: dayjs(endDate)
                .add(9, "hour")
                .add(1, "day")
                .toISOString(),
        },
    });

export default getVideoFromYoutube;
