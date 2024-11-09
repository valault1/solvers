import { Session, createClient } from "@supabase/supabase-js";
import * as React from "react";

const supabase = createClient(
  "https://tbeuoupkqwivrlmgvyxs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZXVvdXBrcXdpdnJsbWd2eXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyODk4NjMsImV4cCI6MjAzNTg2NTg2M30.8HQOa1SGrkfJgMAYk2KAKO1Zd3GetQVAStUYBPl4ucg"
);

export const useAuth = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  React.useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = () => {
    console.log("Logging out...");
    supabase?.auth.signOut();
  };

  return { session, supabaseClient: supabase, logout };
};
