import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Antai",
    template: "%s | Antai",
  },
  description:
    "An ant keeping encyclopedia with species filters, care profiles, and beginner-friendly guidance.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
