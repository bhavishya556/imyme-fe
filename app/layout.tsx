import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

// export const metadata = {
//   title: 'imyme',
//   description: 'imyme application',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
        <body>
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  )
}
