import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

import { Database } from "../types/database";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (SUPABASE_URL === undefined || SUPABASE_KEY === undefined) {
    console.error("create supabase client failure");
}

const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_KEY!);

export default supabase;
