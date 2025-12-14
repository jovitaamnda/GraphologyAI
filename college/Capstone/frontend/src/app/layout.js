import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Grapholyze",
  description: "AI Handwriting Personality Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavbarWrapper />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
