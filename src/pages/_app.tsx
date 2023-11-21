import { SeoTag } from "#/components/reusables/seo-tag";
import { AuthProvider } from "#/contexts/auth-context";
import { HydrationProvider } from "#/contexts/hydration-provider";
import { ProductsProvider } from "#/contexts/product-context";
import { ApiClientProvider } from "#/http";
import "#/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AlertDialogProvider } from "#/contexts/alert-dialog-context";
import Script from "next/script";

const font = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <SeoTag title="Home" />
      <ToastContainer
        icon
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        limit={1}
        pauseOnHover
      />
      <ApiClientProvider>
        <HydrationProvider>
          <AnimatePresence mode="wait" initial={false}>
            <AlertDialogProvider>
              <AuthProvider>
                <ProductsProvider>
                  <div className={font.className}>
                    <Component {...pageProps} />
                  </div>
                </ProductsProvider>
              </AuthProvider>
            </AlertDialogProvider>
          </AnimatePresence>
        </HydrationProvider>
      </ApiClientProvider>
    </>
  );
}
