import React from "react";
import { Routes, Route } from "react-router-dom";
import { WavePortal } from "./pages/WavePortal";
import { About } from "./pages/About";
import { RoutePaths } from "./routes/RoutePaths";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/${RoutePaths.ROOT}`} element={<WavePortal />} />
      <Route path={`/${RoutePaths.ABOUT}`} element={<About />} />
    </Routes>
  );
};
