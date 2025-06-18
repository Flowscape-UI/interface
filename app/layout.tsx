import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flowscape – Modular UI / UX Library",
  description:
    "Flowscape is a modern, component-on-demand library that blends fluid UI with seamless UX. Install only the blocks you need – buttons, auth panels, interactive backgrounds, dashboard widgets, loaders and more.",
  keywords: [
    "Flowscape",
    "UI library",
    "UX components",
    "React UI kit",
    "Tailwind components",
    "Lottie buttons",
    "Framer Motion",
    "modular design",
    "dashboard blocks",
    "interactive backgrounds",
  ],
  authors: [{ name: "Flowscape Team", url: "https://flowscape.dev" }],
  creator: "Flowscape",
  publisher: "Flowscape",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  themeColor: "#4facfe",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",

  openGraph: {
    type: "website",
    url: "https://flowscape.dev",
    title: "Flowscape – Modular UI / UX Library",
    description:
      "Install only the UI blocks you need and craft stunning experiences with fluid motion, Lottie icons and Tailwind simplicity.",
    images: [
      {
        url: "/og-logo.png",
        width: 630,
        height: 630,
        alt: "Flowscape gradient logo on dark background",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@flowscape_ui",
    creator: "@flowscape_ui",
    title: "Flowscape – Modular UI / UX Library",
    description:
      "Fluid UI meets seamless UX. Import only what you need: buttons, auth panels, interactive backgrounds and more.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
