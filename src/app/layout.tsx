import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <footer
          id="contact"
          className="mt-16 bg-zinc-900 text-zinc-200"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-200">
                Westwood Dairies
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">
                Fresh dairy, thoughtfully processed with care from farm intake to
                finished product.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-200">
                Quick links
              </h3>
              <div className="mt-4 grid gap-2 text-sm text-zinc-300">
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
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-200">
                Contact
              </h3>
              <div className="mt-4 grid gap-2 text-sm text-zinc-300">
                <a className="transition hover:text-white" href="mailto:orders@westwooddairies.com">
                  orders@westwooddairies.com
                </a>
                <a className="transition hover:text-white" href="tel:+254700000000">
                  +254 700 000 000
                </a>
                <span>Westwood Dairies, Nairobi</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {["IG", "FB", "LI"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-none border border-zinc-700 text-[11px] font-semibold uppercase text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-xs text-zinc-400">
              <span>(c) {new Date().getFullYear()} Westwood Dairies.</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
