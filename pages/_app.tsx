import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { LayoutProps } from "@vercel/examples-ui/layout";

import { getLayout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import "../styles/globals.css";
import Head from "next/head";
function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <div className="bg-[#121C23] text-white">
      <Head>
        <title>HubermanBOT</title>
        <link rel="manifest" href="./manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default App;
