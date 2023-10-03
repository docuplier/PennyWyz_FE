import React from "react";
import Head from "next/head";

export type SeoLayoutProps = {
  title?: string;
  description?: string;
  image?: string;
  quote?: string;
  hashtag?: string;
};

const defaultDescription = "Pennywyz";

export const SeoTag = ({
  title = "Pennywyz",
  description = defaultDescription,
  image = "",
  quote = defaultDescription,
  hashtag = "Pennywyz",
}: SeoLayoutProps) => {
  return (
    <>
      <Head>
        <title>Pennywyz</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="type" content="website" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href=""></link>
        <meta name="theme-color" content="#66fcf1" />
        <meta property="title" content={title} />
        <meta property="quote" content={quote} />
        <meta name="description" content={description} />
        {/* <meta property="image" content={image} /> */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:quote" content={quote} />
        <meta property="og:hashtag" content={hashtag} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:site_name" content="SportsMediaAnalytics" />
        <meta property="og:description" content={description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {/* <meta name="twitter:url" content="https://example.com" /> */}
      </Head>
    </>
  );
};
