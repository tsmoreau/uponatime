import Head from "next/head";
import Nav from "../components/Nav_Landing";
import Landing from "../components/Landing";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { NextSeo } from "next-seo";

export default function Home2() {
  return (
    <div className="text-black">
      <NextSeo
        title="Home: illoMX"
        description="TAO NFT Marketplace illoMX"
        canonical="https://illo.mx/"
        openGraph={{
          url: "https://nine4-2.vercel.app/"
        }}
      />
      <Head>
        <title>illoMX Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert />
      <Landing />
      <Footer />
    </div>
  );
}
