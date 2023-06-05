import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { LayoutProps } from "@vercel/examples-ui/layout";
import { getLayout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";
import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <SessionProvider session={pageProps.session}>
      <div className="bg-[#121C23] text-white">
        <Head>
          <title>HubermanBOT</title>
          <link rel="manifest" href="./manifest.json" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content="HubermanBot" />
          <meta
            property="og:description"
            content="A Science based AI chatbot, that will help you become 10X"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.hubermanbot.live/" />
          <meta
            property="og:image"
            content="https://www.hubermanbot.live/public/andrew.webp"
          />
        </Head>
        <Component {...pageProps} />
        <Analytics />
      </div>
    </SessionProvider>
  );
}

export default App;
