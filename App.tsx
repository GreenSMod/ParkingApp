import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Auth from "./screens/Auth";
import { Session } from "@supabase/supabase-js";
import MainScreen from "./screens/MainScreen";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      {session && session.user ? (
        <MainScreen key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </>
  );
}
