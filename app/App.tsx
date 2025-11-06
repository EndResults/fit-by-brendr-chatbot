"use client";

import { useCallback } from "react";
import {
  ChatKitPanel,
  type FactAction,
} from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // 1️⃣ Lees taal uit de URL (?lang=nl of ?lang=en)
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const lang = searchParams.get("lang") || "nl";

  // 2️⃣ Locale mapping
  const localeMap: Record<string, string> = {
    nl: "nl-NL",
    en: "en-US",
  };
  const locale = localeMap[lang] || "en-US";

  // 3️⃣ Debug logging
  if (process.env.NODE_ENV !== "production") {
    console.info(`[ChatKit] Active language: ${lang} (${locale})`);
  }

  // 4️⃣ Event handlers
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

  // 5️⃣ Render component
  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          // 🌍 Dynamische taal
          locale={locale}

          // 🎨 Brendr-styling
          colorScheme={scheme}
          accentColor="#ff7a00"
          fontFamily="'Inter', sans-serif"
          radius="large"

          // 🧭 Tekst in juiste taal
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

          // ⚙️ Events
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
