type Holiday = "sunday" | "saturday";

type DAY_OF_WEEK =
    | Holiday
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";

// TODO: 더 적절한 이름으로 변경할 것
interface MonthData {
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
    publishedAt: FullDate | string;
}

type SortingMode = "calendar" | "list";

type Year = `${number}${number}${number}${number}`;

type Month =
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
    | "12";

type YearAndMonth = `${Year}-${Month}`;

// TODO: "day, date" name refactoring
type Day =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;
//TODO:
type FullDate = `${Year}-${Month}-${day}`;

type CalendarData = Record<FullDate, VideoData>;
