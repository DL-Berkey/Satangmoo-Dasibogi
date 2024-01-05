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

type Year = `${number}${number}${number}${number}`;

type Month = `${
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "08"
    | "09"
    | "10"
    | "11"
    | "12"}`;

type YearAndMonth = `${Year}-${Month}`;
