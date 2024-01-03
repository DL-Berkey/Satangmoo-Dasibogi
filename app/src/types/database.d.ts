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
            likes_video: {
                Row: {
                    created_at: string;
                    id: number;
                    user_id: string;
                    video_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    user_id: string;
                    video_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    user_id?: string;
                    video_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "likes_video_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "likes_video_video_id_fkey";
                        columns: ["video_id"];
                        isOneToOne: false;
                        referencedRelation: "video";
                        referencedColumns: ["videoId"];
                    }
                ];
            };
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
            watched_video: {
                Row: {
                    created_at: string;
                    id: number;
                    user_id: string;
                    video_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    user_id: string;
                    video_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    user_id?: string;
                    video_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "watched_video_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "watched_video_video_id_fkey";
                        columns: ["video_id"];
                        isOneToOne: false;
                        referencedRelation: "video";
                        referencedColumns: ["videoId"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            get_likes_video_by_user_id: {
                Args: {
                    user_id_input: string;
                };
                Returns: {
                    video_ids: string[];
                }[];
            };
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
