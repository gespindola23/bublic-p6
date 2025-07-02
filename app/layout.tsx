import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import { CreatePostModal } from "@/components/create-post-modal"
import { CommandKHandler } from "@/components/command-k-handler"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and Bold
  variable: "--font-grotesk",
})

export const metadata: Metadata = {
  title: "BUBLIC",
  description: "The Social Network for Founders.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable} ${spaceGrotesk.variable}`}>
        <CommandKHandler />
        <CreatePostModal />
        {children}
      </body>
    </html>
  )
}
