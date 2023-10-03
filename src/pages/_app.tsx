import { AppLayout } from "#/components/layouts/app-layout";
import Header from "#/components/layouts/header";
import { ListTitle } from "#/components/layouts/list-title";
import { TotalHeader } from "#/components/layouts/total-header";
import { Hero } from "#/components/views/home/hero";
import { AuthProvider } from "#/contexts/auth-context";
import "#/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <AuthProvider>
        {/* <AppLayout >
        <section className="space-y-[20px] mb-[20px]">
          <Hero />
          <ListTitle />
          <TotalHeader />
        </section>
      </AppLayout> */}
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
