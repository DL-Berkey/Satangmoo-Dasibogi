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

interface Thumbnail {
    width: number;
    height: number;
    url: string;
}

interface Snippet {
    channelId: string;
    channelTitel: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    };
    title: string;
}

interface VideoData {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    kind: string;
    snippet: Snippet;
}

interface YoutubeResponse {
    etag: string;
    kind: string;
    pageInfo: { resultsPerPage: number; totalResults: number };
    items: VideoData[];
}

type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

interface Database {
    public: {
        Tables: {
            video: {
                Row: {
                    created_at: string;
                    id: number;
                    publishedAt: string;
                    thumbnails: string;
                    title: string;
                    videoId: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    publishedAt: string;
                    thumbnails?: string;
                    title?: string;
                    videoId?: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    publishedAt?: string;
                    thumbnails?: string;
                    title?: string;
                    videoId?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
          Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
          Database["public"]["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

type Enums<
    PublicEnumNameOrOptions extends
        | keyof Database["public"]["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
