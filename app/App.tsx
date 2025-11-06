"use client";

import { useEffect, useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // 🌍 Bepaal taal op basis van URL (bijv. ?lang=nl of ?lang=en)
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const lang = searchParams.get("lang") || "nl";

  // 🧠 Na render de taal instellen in ChatKit
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
  }, []); // alleen 1x uitvoeren bij mount

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
