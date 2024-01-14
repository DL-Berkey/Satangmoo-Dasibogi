import useCalendar from "../useCalendar";
import useAccount from "../useAccount";
import useBookmarkQuery from "./useBookmarkQuery";
import useBookmarkMutation from "./useBookmarkMutation";

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

        const bookmarkVideoData = query.data.has(videoData.publishedAt);

        if (!bookmarkVideoData) {
            return false;
        }

        return true;
    };

    const mutation = useBookmarkMutation(userId, currentYearAndMonth);

    const updateBookmark = async (
        videoData: VideoData,
        action?: "add" | "remove"
    ) => {
        if (!action) {
            action = isBookmarkVideo(videoData) ? "remove" : "add";
        }

        const result = await mutation.mutateAsync({
            action,
            videoData,
        });

        return result;
    };

    return {
        data: query.data,
        updateBookmark,
        query,
        mutation,
        isBookmarkVideo,
    };
};

export default useBookmark;
