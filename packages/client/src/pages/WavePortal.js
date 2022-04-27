import { useState } from "react";
import { NewWave } from "../components/NewWave";
import { Button } from "../components/Button";
import { Waves } from "../components/Waves";

export const WavePortal = () => {
  const [isConnected, setIsConnected] = useState(false);

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

  return (
    <div className="container mx-auto">
      {isConnected && <NewWave newWave={newWave} />}

      {!isConnected ? (
        <Button onClick={() => setIsConnected(!isConnected)} className="mt-4">
          Connect wallet
        </Button>
      ) : (
        <Waves waves={waves} />
      )}
    </div>
  );
};
