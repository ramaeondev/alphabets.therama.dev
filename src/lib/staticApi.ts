// Read-only access to public reference data on the self-hosted Supabase backend
// (schema "static" at https://api-v3.therama.dev). No login needed.
// The publishable key is meant to be public; the backend only allows SELECT on this schema.

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://api-v3.therama.dev';
const SUPABASE_PUBLISHABLE_KEY =
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    'sb_publishable_TvfycUXoZ1whU1e-L8qhH-_PwN2YmxB';

export async function selectStatic<T>(table: string, query: string): Promise<T[]> {
    const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}?${query}`;
    const response = await fetch(url, {
        headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            'Accept-Profile': 'static',
        },
    });
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status} (static.${table})`);
    }
    return response.json();
}
