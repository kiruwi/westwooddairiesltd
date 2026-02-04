import type { Metadata } from "next";
import Image from "next/image";
import {
  Geist,
  Geist_Mono,
  Nunito,
  Chewy,
  Playfair_Display,
  Pacifico,
} from "next/font/google";
import SiteHeader from "../components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Westwood Dairies",
  description: "Fresh milk, expertly processed into cultured favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${chewy.variable} ${playfair.variable} ${pacifico.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <footer id="contact" className="relative z-10 -mt-20 text-white">
          <div className="bg-[#213864]">
            <div className="grid w-full gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
              <div>
                <a href="/" aria-label="Westwood Dairies home">
                  <Image
                    src="/images/logo-2-wite.webp"
                    alt="Westwood Dairies"
                    width={324}
                    height={94}
                    className="h-[86px] w-auto"
                  />
                </a>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                  Thoughtfully processed with care from farm intake to finished product.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-white font-title-italic">
                  Quick links
                </h3>
                <div className="mt-4 grid gap-2 text-sm text-white/80">
                  <a className="transition hover:text-white" href="/#home">
                    Home
                  </a>
                  <a className="transition hover:text-white" href="/products">
                    Products
                  </a>
                  <a className="transition hover:text-white" href="/#process">
                    Process
                  </a>
                  <a className="transition hover:text-white" href="/#stockists">
                    Stockists
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-white font-title-italic">
                  Contact
                </h3>
                <div className="mt-4 grid gap-2 text-sm text-white/80">
                  <a
                    className="transition hover:text-white"
                    href="mailto:orders@westwooddairies.com"
                  >
                    orders@westwooddairies.com
                  </a>
                  <a className="transition hover:text-white" href="tel:+254700000000">
                    +254 700 000 000
                  </a>
                  <span>Nairobi</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                      <circle cx="12" cy="12" r="3.5" />
                      <circle cx="17.5" cy="6.5" r="1" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.2c0-.5.3-.8.5-.8Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M6.5 9.5H3.8V21h2.7V9.5ZM5.1 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.5 14.2c0-2.7-1.4-4-3.4-4-1.6 0-2.3.9-2.7 1.5V9.5h-2.6V21h2.6v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.9 2 3.2V21h2.6v-6.8Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#c7d5f0]">
            <div className="flex w-full items-center justify-center px-6 py-4 text-xs text-[#213864]">
              © 2026 Fresh dairy made with care.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
