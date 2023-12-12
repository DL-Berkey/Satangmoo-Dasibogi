// // youtube response types
// interface Thumbnail {
//     width: number;
//     height: number;
//     url: string;
// }

// interface Snippet {
//     channelId: string;
//     channelTitel: string;
//     description: string;
//     liveBroadcastContent: string;
//     publishTime: string;
//     publishedAt: string;
//     thumbnails: {
//         default: Thumbnail;
//         medium: Thumbnail;
//         high: Thumbnail;
//     };
//     title: string;
// }

// interface VideoData {
//     etag: string;
//     id: {
//         kind: string;
//         videoId: string;
//     };
//     kind: string;
//     snippet: Snippet;
// }

// interface YoutubeResponse {
//     etag: string;
//     kind: string;
//     pageInfo: { resultsPerPage: number; totalResults: number };
//     items: VideoData[];
// }
