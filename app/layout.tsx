import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import BootstrapClient from "./BootstrapClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />


        {children}
      </body>
    </html>
  );
}