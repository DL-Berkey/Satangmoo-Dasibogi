import { useSuspenseQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKeys";
import supabase from "@/supabaseConfig/client";

const getVideoMap = async (startingFull: FullDate, endFull: FullDate) => {
    const { data, error } = await supabase
        .from("video")
        .select()
        .gte("publishedAt", startingFull)
        .lte("publishedAt", endFull);

    if (error) {
        throw error;
    }

    const result: MonthlyVideo = new Map();

    data.forEach((value) => {
        const thumbnails: VideoData["thumbnails"] = JSON.parse(
            value.thumbnails
        );

        const fullDate = value.publishedAt as FullDate;

        result.set(fullDate, {
            ...value,
            thumbnails: thumbnails,
        });
    });

    return result;
};

export const useFetchingVideo = (monthPeriod: MonthPeriod) => {
    const query = useSuspenseQuery({
        queryKey: [QUERY_KEY.video, monthPeriod.yearAndMonth],
        queryFn: () =>
            getVideoMap(monthPeriod.startingFullDate, monthPeriod.endFullDate),
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
    currentMonthPeriod: MonthPeriod;
    prevMonthPeriod: MonthPeriod;
    nextMonthPeriod: MonthPeriod;
}) => {
    const currentMonthQuery = useFetchingVideo(currentMonthPeriod);
    const prevMonthQuery = useFetchingVideo(prevMonthPeriod);
    const nextMonthQuery = useFetchingVideo(nextMonthPeriod);

    return { currentMonthQuery, prevMonthQuery, nextMonthQuery };
};
