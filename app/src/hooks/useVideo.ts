import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/querykeys";
import supabase from "@/supabaseConfig/client";

const getVideoMap = async (startingDate: string, endDate: string) => {
    const { data, error } = await supabase
        .from("video")
        .select()
        .gte("publishedAt", startingDate)
        .lte("publishedAt", endDate);

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

export const useFetchingVideo = (monthPeriod: Period) => {
    const query = useSuspenseQuery({
        queryKey: [QUERY_KEY.video, monthPeriod.yearAndMonth],
        queryFn: () =>
            getVideoMap(monthPeriod.startingDate, monthPeriod.endDate),
    });

    if (query.error) {
        throw query.error;
    }

    return query;
};
export const useFetchingAllVideo = ({
    currentMonthPeriod,
    prevMonthPeriod,
    nextMonthPeriod,
}: {
    currentMonthPeriod: Period;
    prevMonthPeriod: Period;
    nextMonthPeriod: Period;
}) => {
    const currentMonthQuery = useFetchingVideo(currentMonthPeriod);
    const prevMonthQuery = useFetchingVideo(prevMonthPeriod);
    const nextMonthQuery = useFetchingVideo(nextMonthPeriod);

    return { currentMonthQuery, prevMonthQuery, nextMonthQuery };
};
