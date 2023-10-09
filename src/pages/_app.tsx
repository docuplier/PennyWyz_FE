import { SeoTag } from "#/components/reusables/seo-tag";
import { AuthProvider } from "#/contexts/auth-context";
import { HydrationProvider } from "#/contexts/hydration-provider";
import { ProductsProvider } from "#/contexts/product-context";
import { ApiClientProvider } from "#/http";
import "#/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SeoTag title="Home" />
      <ApiClientProvider>
        <HydrationProvider>
          <AnimatePresence mode="wait" initial={false}>
            <AuthProvider>
              <ProductsProvider>
                <div className={font.className}>
                  <Component {...pageProps} />
                </div>
              </ProductsProvider>
            </AuthProvider>
          </AnimatePresence>
        </HydrationProvider>
      </ApiClientProvider>
    </>
  );
}
