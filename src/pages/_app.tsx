import { SeoTag } from "#/components/reusables/seo-tag";
import { AuthProvider } from "#/contexts/auth-context";
import "#/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SeoTag title="Home" />
      <AnimatePresence mode="wait" initial={false}>
        <AuthProvider>
          <div className={font.className}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
}
