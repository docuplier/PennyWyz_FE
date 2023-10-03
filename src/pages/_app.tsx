import { AppLayout } from "#/components/layouts/app-layout";
import Header from "#/components/layouts/header";
import { ListTitle } from "#/components/layouts/list-title";
import { TotalHeader } from "#/components/layouts/total-header";
import { SeoTag } from "#/components/reusables/seo-tag";
import { Hero } from "#/components/views/home/hero";
import { AuthProvider } from "#/contexts/auth-context";
import "#/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SeoTag title="Home" />
      <div className={font.className}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    </>
  );
}
