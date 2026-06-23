import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatsApp Agent | Automatisez votre WhatsApp avec l'IA",
  description: "Plateforme SaaS pour automatiser la gestion de leads, le support client et les ventes via WhatsApp grâce à l'Intelligence Artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white antialiased`}>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1A1A2E',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
      </body>
    </html>
  );
}
