import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_APIKEY;

const createSupabaseClient = () => {
	if (SUPABASE_URL !== undefined && SUPABASE_ANON_KEY !== undefined) {
		const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
		return supabase;
	} else {
		throw new Error("Supabase URL or API key is undefined");
	}
}

export const supabase = createSupabaseClient();
