import React from "react";

export const Waves = ({ waves }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 mt-10">
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {waves.map((wave) => {
            return (
              <li className="py-3 sm:py-4" key={wave.address}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {wave.message}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {wave.address}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {wave.timestamp}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
