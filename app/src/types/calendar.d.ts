type Holiday = "sunday" | "saturday";

type DAY_OF_WEEK =
    | Holiday
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";

interface MonthDays {
    [key: YearAndMonth]: Day[];
}

interface MonthPeriod {
    yearAndMonth: YearAndMonth;
    startingFullDate: FullDate;
    endFullDate: FullDate;
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

type PaddedDay =
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
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "27"
    | "28"
    | "29"
    | "30"
    | "31";

type FullDate = `${Year}-${Month}-${PaddedDay}`;

type MonthlyVideo = Map<FullDate, VideoData>;

//
// type LessThan<N extends number, A extends any[] = []> = N extends A['length'] ? A[number] : LessThan<N, [...A, A["length"]]>

// type NumericRange<F extends number, T extends number> = Exclude<T | LessThan<T>, LessThan<F>>

// type Days = NumericRange<1, 31>
//
