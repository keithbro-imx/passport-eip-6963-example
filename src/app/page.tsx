"use client";

import { abi } from "@/abi";
import { useAccount, useWriteContract } from "wagmi";

function ConnectButton() {
  return <w3m-button />;
}

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const claimGem = async () => {
    writeContract({
      abi,
      address: "0x3f04d7a7297d5535595eE0a30071008B54E62A03",
      functionName: "earnGem",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <ConnectButton />
      {isConnected ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={claimGem}
        >
          Claim Gem
        </button>
      ) : null}
    </main>
  );
}
