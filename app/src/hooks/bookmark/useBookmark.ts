import useAccount from "../useAccount";
import useBookmarkQuery from "./useBookmarkQuery";
import useBookmarkMutation from "./useBookmarkMutation";

const useBookmark = () => {
    const { userDataQuery } = useAccount();
    const userId = userDataQuery.data ? userDataQuery.data.id : null;

    const query = useBookmarkQuery(userId);

    const isBookmarkedVideo = (videoId: string) => {
        if (!query.data) {
            return false;
        }

        return query.data.includes(videoId);
    };

    const mutation = useBookmarkMutation(userId);

    const updateBookmark = async (
        videoId: string,
        action?: "add" | "remove"
    ) => {
        if (!action) {
            action = isBookmarkedVideo(videoId) ? "remove" : "add";
        }

        const result = await mutation.mutateAsync({ action, videoId });

        return result;
    };

    return {
        data: query.data,
        updateBookmark,
        query,
        mutation,
        isBookmarkedVideo,
    };
};

export default useBookmark;
