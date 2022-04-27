import React from "react";
import { Button } from "./Button";
import { useState } from "react";

export const NewWave = ({ newWave }) => {
  const [message, setMessage] = useState("");
  const onClick = () => {
    if (!message) {
      alert("You must type a message to send!");
      return;
    }
    setMessage("");
    newWave({ message });
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Your Message
      </label>
      <div className="flex items-stretch mb-4 ">
        <input
          type="text"
          id="message"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type whatever you want"
        />
        <Button onClick={onClick} className="ml-4">
          Wave at me
        </Button>
      </div>
    </div>
  );
};
