import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Feedback } from "@/components/Feedback";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mindspark — learn by solving",
  description:
    "Short, interactive lessons in logic, probability, computer science, algebra and neural networks. You learn by solving problems, not by watching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 antialiased dark:bg-slate-950`}
      >
        <Nav />
        <main>{children}</main>
        <footer className="mx-auto max-w-5xl px-5 py-10 text-center text-xs text-slate-400 dark:text-slate-600">
          Mindspark — an independent interactive-learning demo. Progress is stored in your browser only.
        </footer>
        <Feedback />
      </body>
    </html>
  );
}
