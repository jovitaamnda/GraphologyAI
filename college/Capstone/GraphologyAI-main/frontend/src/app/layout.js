import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Grapholyze",
  description: "AI Handwriting Personality Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-10">{children}</main>
      </body>
    </html>
  );
}
