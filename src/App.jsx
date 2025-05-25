import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PieChartPage from "./pages/PieChartPage";
import TreeMapPage from "./pages/TreeMapPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pie-chart" element={<PieChartPage />} />
        <Route path="/tree-graph" element={<TreeMapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
