import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import "@/styles/backgrounds.css";
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] })

// 🌟 Imyme Branding
// const APP_TITLE = 'Imyme | Build Your Website Instantly'
// const APP_DESCRIPTION = 'Imyme is a no-code website builder that lets you create stunning websites instantly on your own subdomain or custom domain. SEO-friendly, fast, and designed for individuals, teams, and organizations.'
// const APP_NAME = 'Imyme'

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.BASE_URL || "https://imyme.in"),
//   title: APP_TITLE,
//   description: APP_DESCRIPTION,

//   applicationName: APP_NAME,
//   keywords: [
//     "No-code website builder",
//     "SEO friendly websites",
//     "Custom domains",
//     "Subdomain websites",
//     "Instant website creation",
//     "Personal portfolio builder",
//     "Team pages",
//     "Dynamic templates",
//     "Blog CMS",
//     "Imyme"
//   ],

//   authors: [
//     { name: 'Imyme Team', url: "https://imyme.in" },
//   ],
//   creator: 'Imyme',
//   publisher: 'Imyme',
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en-US',
//     },
//   },
//   openGraph: {
//     title: APP_TITLE,
//     description: APP_DESCRIPTION,
//     url: process.env.BASE_URL || "https://imymy.in",
//     siteName: APP_NAME,
//     type: "website",
//     locale: "en_US"
//   },
//   twitter: {
//     title: APP_TITLE,
//     description: APP_DESCRIPTION,
//     card: "summary_large_image"
//   }
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId='1071195282445-1l7m0qg45728r3m0bop4jtpqf6rrg2an.apps.googleusercontent.com'>


          {children}
          <Toaster />
        </GoogleOAuthProvider>

      </body>
    </html>
  )
}
