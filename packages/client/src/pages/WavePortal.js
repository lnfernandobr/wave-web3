import { useEffect, useState } from "react";
import { NewWave } from "../components/NewWave";
import { Button } from "../components/Button";
import { Waves } from "../components/Waves";

const METAMASK_METHODS = {
  GET_ACCOUNTS: "eth_accounts",
  REQUEST_ACCOUNTS: "eth_requestAccounts",
};

export const WavePortal = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAcccount] = useState(null);

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

  const newWave = ({ message }) => {
    console.log(message);
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
