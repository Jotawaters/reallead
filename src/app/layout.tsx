import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Real Lead Tools",
  description: "Tu asistente CRM inteligente",
};

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "pk_test_PLACEHOLDER";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (DEMO_MODE) {
    return (
      <html lang="es">
        <body className={`${geistSans.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  // Dynamic import to avoid errors when Clerk keys are missing
  const { ClerkProvider } = await import("@clerk/nextjs");
  const { esES } = await import("@clerk/localizations");

  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={`${geistSans.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
