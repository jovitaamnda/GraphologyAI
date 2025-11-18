import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

export const metadata = {
  title: "Grapholyze",
  description: "AI Handwriting Personality Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
