import React from "react";
import type { ReactNode } from "react";
import AuthProvider from "/Users/damianohienmhen/Downloads/energi/app/components/AuthProvider.jsx"; // client component for nav + login/logout

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        {/* AuthProvider handles navigation, login, logout */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
