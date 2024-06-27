"use client";

import { abi } from "@/abi";
import { passportInstance } from "@/passport";
import { useState } from "react";
import { Hex, getContract, hashMessage, parseAbi } from "viem";
import {
  useAccount,
  usePublicClient,
  useSignMessage,
  useWriteContract,
} from "wagmi";

function ConnectButton() {
  return <w3m-button />;
}

const TEST_MESSAGE = "Important Message";
const ERC_1271_MAGIC_VALUE = "0x1626ba7e";

export default function Home() {
  const [signature, setSignature] = useState<Hex | null>(null);
  const client = usePublicClient();

  const { isConnected, address } = useAccount();
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
    if (!address) throw new Error("Address not found");

    const res = await signMessageAsync({
      message: TEST_MESSAGE,
    });
    console.log({ res });
    setSignature(res);
  };

  const verifyMessage = async () => {
    if (!client) throw new Error("Public client not found");
    if (!signature) throw new Error("Signature not found");
    if (!address) throw new Error("Address not found");

    const res = await client.verifyMessage({
      signature,
      address,
      message: TEST_MESSAGE,
    });

    console.log({
      res,
    });
  };

  const alternativeVerifyMessage = async () => {
    if (!client) throw new Error("Public client not found");
    if (!signature) throw new Error("Signature not found");
    if (!address) throw new Error("Address not found");

    const walletContract = getContract({
      abi: parseAbi([
        "function isValidSignature(bytes32, bytes) public view returns (bytes4)",
      ]),
      address,
      client,
    });

    const digest = hashMessage(TEST_MESSAGE);

    const isValidSignatureHex = await walletContract.read.isValidSignature([
      digest,
      signature,
    ]);
    const valid = isValidSignatureHex === ERC_1271_MAGIC_VALUE;

    console.log({
      valid,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24 bg-black text-white">
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
          {signature && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={verifyMessage}
            >
              Verify Signature
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={alternativeVerifyMessage}
          >
            Alt Verify Signature
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => passportInstance.logout()}
          >
            Disconnect (workaround)
          </button>
        </>
      ) : null}
    </main>
  );
}
