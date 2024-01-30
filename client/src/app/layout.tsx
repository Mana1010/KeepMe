import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
const DMSans = DM_Sans({ subsets: ["latin"] });
import { Suspense, lazy } from "react";
import Provider from "./Provider";
const Navbar = lazy(() => {
  return import("./components/Sidebar");
});
export const metadata: Metadata = {
  title: "KeepMe",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className={`${DMSans.className} flex`}>
            <Suspense fallback={<h1>Loading.....</h1>}>
              <Navbar />
              <Header />
              <NextTopLoader color="#120C18" shadow={false} />
              {children}
              <Toaster duration={3000} />
            </Suspense>
          </div>
        </Provider>
      </body>
    </html>
  );
}
