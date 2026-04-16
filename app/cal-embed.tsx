"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1B2A4A",
            "cal-brand-emphasis": "#243556",
            "cal-text": "#2D2D2D",
            "cal-text-emphasis": "#1B2A4A",
          },
          dark: {
            "cal-brand": "#C9A84C",
            "cal-brand-emphasis": "#D4B86A",
            "cal-text": "#E5E5E5",
            "cal-text-emphasis": "#FFFFFF",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-border overflow-hidden" style={{ minHeight: 500 }}>
      <Cal
        calLink="aser-ignace/30min"
        style={{ width: "100%", height: "100%", overflow: "auto", minHeight: 500 }}
        config={{
          layout: "month_view",
          theme: "light",
        }}
      />
    </div>
  );
}
