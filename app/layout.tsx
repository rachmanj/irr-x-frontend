import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/providers/session-provider"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
