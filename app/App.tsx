"use client";

import { useCallback } from "react";
import {
  ChatKitPanel,
  type FactAction,
} from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // 1️⃣ Lees huidige taal uit URL (?lang=nl of ?lang=en)
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const lang = searchParams.get("lang") || "nl";

  // 2️⃣ Locale mapping voor ChatKit (standaard en-US)
  const localeMap: Record<string, string> = {
    nl: "nl-NL",
    en: "en-US",
  };
  const locale = localeMap[lang] || "en-US";

  // 3️⃣ Logging voor debug (optioneel)
  if (process.env.NODE_ENV !== "production") {
    console.info(`[ChatKit] Active language: ${lang} (${locale})`);
  }

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
          theme={{
            colorScheme: scheme,
            color: { accent: { primary: "#ff7a00" } },
            typography: { fontFamily: "'Inter', sans-serif" },
            radius: "large",
          }}
          options={{
            locale, // ✅ Dynamisch ingestelde taal
            startScreen: {
              greeting:
                lang === "nl"
                  ? "Welkom bij Brendr Assistant!"
                  : "Welcome to Brendr Assistant!",
            },
            composer: {
              placeholder:
                lang === "nl"
                  ? "Typ hier je vraag over FiT of Brendr..."
                  : "Type your question about FiT or Brendr...",
            },
          }}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
