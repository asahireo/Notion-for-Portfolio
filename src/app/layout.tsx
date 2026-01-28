import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alfahad Niloy | Developer Portfolio",
  description: "High-performance developer portfolio showcasing projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} antialiased bg-brand-dark text-brand-light selection:bg-brand-neon selection:text-brand-dark`}
      >
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none z-[100]" />
          {children}
        </SmoothScroll>
      </body>
    </html >
  );
}
