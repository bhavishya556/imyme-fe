import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";

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
          <Nav />
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  )
}
