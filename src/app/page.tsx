"use client";

import { abi } from "@/abi";
import { useAccount, useSignMessage, useWriteContract } from "wagmi";

function ConnectButton() {
  return <w3m-button />;
}

export default function Home() {
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();

  const claimGem = async () => {
    writeContract({
      abi,
      address: "0x3f04d7a7297d5535595eE0a30071008B54E62A03",
      functionName: "earnGem",
    });
  };

  const signImportantMessage = async () => {
    const res = await signMessageAsync({ message: "Important message" });
    console.log({ res });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <ConnectButton />
      {isConnected ? (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={claimGem}
          >
            Claim Gem
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={signImportantMessage}
          >
            Sign Important Message
          </button>
        </>
      ) : null}
    </main>
  );
}
