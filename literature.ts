import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gene Prioritizer",
  description: "AI-powered phenotype-to-gene prioritization for clinical genetics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
