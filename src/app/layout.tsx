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
        <footer id="contact" className="text-white">
          <div className="bg-[#0154ba]">
            <div className="grid w-full gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <a href="/" aria-label="Westwood Dairies home">
                <Image
                  src="/images/logo-white.webp"
                  alt="Westwood Dairies"
                  width={270}
                  height={78}
                  className="h-[72px] w-auto"
                />
              </a>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                Thoughtfully processed with care from farm intake to finished product.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-white">
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
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-white">
                Contact
              </h3>
              <div className="mt-4 grid gap-2 text-sm text-white/80">
                <a className="transition hover:text-white" href="mailto:orders@westwooddairies.com">
                  orders@westwooddairies.com
                </a>
                <a className="transition hover:text-white" href="tel:+254700000000">
                  +254 700 000 000
                </a>
                <span>Nairobi</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {["IG", "FB", "LI"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-none border border-white/40 text-[11px] font-medium uppercase text-white/80 transition hover:border-white hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>
          <div className="bg-[#62b4e3]">
            <div className="flex w-full items-center justify-center px-6 py-4 text-xs text-white">
              © 2026 Fresh dairy made with care.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
