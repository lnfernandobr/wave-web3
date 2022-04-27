import { useEffect, useState } from "react";
import { NewWave } from "../components/NewWave";
import { Button } from "../components/Button";
import { Waves } from "../components/Waves";
import { ethers } from "ethers";
import { contractWavePortalABI } from "../contracts/WavePortal";

const METAMASK_METHODS = {
  GET_ACCOUNTS: "eth_accounts",
  REQUEST_ACCOUNTS: "eth_requestAccounts",
};

export const WavePortal = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAcccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const waves = [
    {
      address: "#AWE455Twq2132312",
      message: "Hello world!",
      timestamp: "24/07/2022",
    },
    {
      address: "#faFR512wq2132312",
      message: "Hello world AGAIN!",
      timestamp: "01/01/2022",
    },
  ];

  const newWave = async ({ message }) => {
    try {
      setIsLoading(true);

      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractWavePortalABI.jsonInterface,
        contractWavePortalABI.getABI(),
        signer
      );

      const waveTranscation = await wavePortalContract.wave(message, {
        gasLimit: 300000,
      });

      console.info("Mining transcation...", waveTranscation.hash);
      await waveTranscation.wait();
      console.info("Mined transaction -- ", waveTranscation.hash);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Your divice don't have metamask wallet installed.");
        return;
      }

      const accounts = await ethereum.request({
        method: METAMASK_METHODS.REQUEST_ACCOUNTS,
      });

      setAcccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      const accounts = await ethereum.request({
        method: METAMASK_METHODS.GET_ACCOUNTS,
      });
      if (accounts.length) {
        setAcccount(accounts[0]);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    connectWallet().catch((error) => console.error(error));
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="container mx-auto">
      {account && <NewWave newWave={newWave} />}

      {!account ? (
        <Button onClick={requestWallet} className="mt-4">
          Connect wallet
        </Button>
      ) : (
        <Waves waves={waves} />
      )}
    </div>
  );
};
