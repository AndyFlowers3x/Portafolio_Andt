import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingTetris from "@/components/FloatingTetris";
import KonamiCode from "@/components/KonamiCode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andy Flores | Full Stack Developer & App Engineer",
  description: "Desarrollador de Software especializado en React, Next.js, Node.js y soluciones web de alto rendimiento. Creamos el futuro de tu negocio con tecnología moderna.",
  keywords: ["Andy Flores", "Desarrollador Web México", "Full Stack Developer", "Next.js expert", "Ingeniero de Software", "Freelance Web Developer", "React Developer"],
  authors: [{ name: "Andy Flores" }],
  creator: "Andy Flores",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://andyflores.dev", // Cambia esto por tu dominio final
    title: "Andy Flores | Portafolio Profesional",
    description: "Soluciones web modernas, escalables y con diseño de alto impacto. Especialista en React y Next.js.",
    siteName: "Andy Flores Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Flores | Software Engineer",
    description: "Transformando ideas en experiencias digitales excepcionales.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* JSON-LD for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Andy Flores",
              "jobTitle": "Full Stack Developer",
              "url": "https://andyflores.dev",
              "sameAs": [
                "https://www.linkedin.com/in/andy-flores-701883312/",
                "https://github.com/AndyFlowers3x",
                "https://www.instagram.com/xyz_andt"
              ],
              "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PHP", "Software Architecture"]
            })
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingTetris />
        <KonamiCode />
      </body>
    </html>
  );
}
