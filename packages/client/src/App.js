import React from "react";
import { NavMenu } from "./components/NavMenu";
import { Waves } from "./components/Waves";
import { AppRoutes } from "./AppRoutes";
import { RoutePaths } from "./routes/RoutePaths";

const menuItems = [
  { label: "Waves", link: RoutePaths.ROOT },
  { label: "About", link: `/${RoutePaths.ABOUT}` },
];

export const App = () => {
  return (
    <main className="p-4">
      <NavMenu items={menuItems} />

      <AppRoutes />
    </main>
  );
};
