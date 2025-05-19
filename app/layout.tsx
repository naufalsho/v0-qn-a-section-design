import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FloatingQnAWidget from "@/components/floating-qna-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Heavy Equipment Comparison",
  description: "Compare heavy equipment specifications and prices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <FloatingQnAWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
