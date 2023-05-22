import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="HubermanBot is a fan made llm chatbot based upon the data of Dr. Andrew Huberman's youtube channel, you can ask it any questions and it will give you the answers based upon its knowledge from Dr. Huberman's videos"
        />
        <html lang="en" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
