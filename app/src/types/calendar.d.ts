type Holiday = "sunday" | "saturday";

type DAY_OF_WEEK =
    | Holiday
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";

interface CalendarData {
    [key: string]: number[];
}

interface Period {
    yearAndMonth: string;
    startingDate: string;
    endDate: string;
}

interface Thumbnail {
    width: number;
    height: number;
    url: string;
}

interface VideoData {
    id: number;
    created_at: string;
    title: string;
    videoId: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    };
    publishedAt: string;
}

type SortingMode = "calendar" | "list";
