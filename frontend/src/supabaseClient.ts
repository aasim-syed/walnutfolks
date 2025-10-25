import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const DEMO_MODE: boolean = !url || !key;

type Row = { email: string; data: any };

// Minimal localStorage-backed mock so the app still works without Supabase envs
function localMock() {
  return {
    from(table: string) {
      if (table !== "analytics") {
        throw new Error("Only 'analytics' table is supported in demo mode.");
      }
      return {
        async select(_cols: string) {
          return this;
        },
        eq(_col: string, email: string) {
          const raw = localStorage.getItem(`analytics:${email}`);
          const data = raw ? JSON.parse(raw) : null;
          return {
            async single() {
              return { data: data ? { data } : null, error: null };
            },
          };
        },
        async upsert(obj: Row) {
          localStorage.setItem(`analytics:${obj.email}`, JSON.stringify(obj.data));
          return { data: null, error: null };
        },
      };
    },
  };
}

export const supabase = DEMO_MODE ? (localMock() as any) : createClient(url!, key!);

if (DEMO_MODE) {
  // eslint-disable-next-line no-console
  console.warn("[voice-analytics] DEMO MODE: Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Using localStorage.");
}
