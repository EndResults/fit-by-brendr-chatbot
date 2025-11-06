"use client";

import { useEffect, useCallback } from "react";
import {
  ChatKitPanel,
  type FactAction,
} from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // 1️⃣ Lees taal uit URL (?lang=nl of ?lang=en)
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const lang = searchParams.get("lang") || "nl";

  // 2️⃣ Stel taal in via ChatKit API na render
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chatkit = (window as any).chatkit;
      if (chatkit && typeof chatkit.setOptions === "function") {
        try {
          chatkit.setOptions({
            locale: lang === "nl" ? "nl-NL" : "en-US",
          });
          console.info(`[ChatKit] Locale set to ${lang}`);
        } catch (err) {
          console.warn("[ChatKit] Could not set locale", err);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // geen dependency nodig

  // 3️⃣ Event handlers
  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  // 4️⃣ Render component
  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          // 🌙 Simpel dark/light theme (jouw build ondersteunt alleen dit)
          theme={scheme}
          // 🗣️ Dynamische teksten
          startScreenGreeting={
            lang === "nl"
              ? "Welkom bij Brendr Assistant!"
              : "Welcome to Brendr Assistant!"
          }
          composerPlaceholder={
            lang === "nl"
              ? "Typ hier je vraag over FiT of Brendr..."
              : "Type your question about FiT or Brendr..."
          }
          // ⚙️ Event handlers
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
