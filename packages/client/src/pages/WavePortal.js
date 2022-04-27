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
  const [waves, setWaves] = useState([]);
  const [account, setAcccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWavePortalContract = () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(
        contractWavePortalABI.jsonInterface,
        contractWavePortalABI.getABI(),
        signer
      );
    } catch (error) {
      throw error;
    }
  };

  const newWave = async ({ message }) => {
    try {
      setIsLoading(true);

      const wavePortalContract = getWavePortalContract();

      const waveTranscation = await wavePortalContract.wave(message, {
        gasLimit: 300000,
      });

      console.info("Mining transcation...", waveTranscation.hash);
      await waveTranscation.wait();
      console.info("Mined transaction -- ", waveTranscation.hash);
    } catch (error) {
      if (error.code === 4001) {
        alert("You cancelled the transaction!");
        return;
      }
      throw new Error(`Error trying to create new wave: ${error}`);
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
      throw new Error(`Error trying to request connection wallet: ${error}`);
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
      throw new Error(`Error trying to connect wallet: ${error}`);
    }
  };

  const getAllWaves = async () => {
    try {
      if (!window.ethereum) {
        return;
      }

      const wavePortalContract = getWavePortalContract();
      const waves = await wavePortalContract.getAllWaves();
      const mappedWaves = waves.map((wave) => {
        return {
          ...wave,
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
        };
      });

      setWaves(mappedWaves);
    } catch (error) {
      throw new Error(`Error trying to get all waves: ${error}`);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const wavePortalContract = getWavePortalContract();

    const onNewWave = (from, timestamp, message) => {
      setWaves((prevState) => [
        ...prevState,
        {
          address: from,
          message: message,
          timestamp: new Date(timestamp * 1000),
        },
      ]);
    };

    connectWallet().catch((error) => console.error(error));

    if (window.ethereum) {
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  useEffect(() => {
    getAllWaves().catch((error) => console.error(error));
  }, [account]);

  if (isLoading) {
    return (
      <div className="container mx-auto flex mt-8 items-center">
        <svg
          role="status"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          ></path>
        </svg>
        Wait a minute, we are mining your transaction...
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div
        className="p-4 mt-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
        role="alert"
      >
        <span className="font-medium">Warning alert!</span> This will only work
        on Rinkeby network.
      </div>

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
