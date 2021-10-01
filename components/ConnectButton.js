import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();

  const handleSign = async () => {
    const msg = "Next Web3 Boilerplate Rules";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <header>
        <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-green-300 hover:from-indigo-600 hover:via-pink1-600 hover:to-red-600 inline-flex items-center px-10 py-2 mt-4 font-normal text-white   active:bg-blue-600 rounded-lg text-md md:mt-0">
          <Account triedToEagerConnect={triedToEagerConnect} />
        </div>
      </header>
    </div>
  );
}
