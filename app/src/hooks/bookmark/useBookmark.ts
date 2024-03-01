import useCalendar from "../useCalendar";
import useAccount from "../useAccount";
import useBookmarkQuery from "./useBookmarkQuery";
import { useAddingBookmark, useRemovingBookmark } from "./useBookmarkMutation";

const useBookmark = () => {
    const {
        yearAndMonth: { currentYearAndMonth },
    } = useCalendar();

    const { userDataQuery } = useAccount();
    const userId = userDataQuery.data ? userDataQuery.data.id : null;

    const query = useBookmarkQuery(userId, currentYearAndMonth);

    const isBookmarkVideo = (videoData: VideoData) => {
        if (!query.data) {
            return false;
        }

        const bookmarkVideoData = query.data.has(
            videoData.publishedAt as FullDate
        );

        if (!bookmarkVideoData) {
            return false;
        }

        return true;
    };

    const addingMutation = useAddingBookmark();
    const removingMutation = useRemovingBookmark();

    const updateBookmark = async (
        videoData: VideoData,
        action?: "add" | "remove"
    ) => {
        if (!userId) {
            return;
        }

        if (!action) {
            action = isBookmarkVideo(videoData) ? "remove" : "add";
        }

        if (action === "add") {
            await addingMutation.mutateAsync({
                userId,
                videoData,
                yearAndMonth: currentYearAndMonth,
            });
        } else {
            await removingMutation.mutateAsync({
                userId,
                videoData,
                yearAndMonth: currentYearAndMonth,
            });
        }
    };

    return {
        query,
        data: query.data,
        updateBookmark,
        isBookmarkVideo,
    };
};

export default useBookmark;
