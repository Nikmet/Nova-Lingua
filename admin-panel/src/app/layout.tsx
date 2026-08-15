import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-montserrat-alt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Lingua — админка",
  description: "Заявки, ученики, группы и расписание школы Nova Lingua",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${montserratAlternates.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
