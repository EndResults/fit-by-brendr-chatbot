useEffect(() => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatkit = (window as any).chatkit;
    if (chatkit) {
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
}, [lang]);
