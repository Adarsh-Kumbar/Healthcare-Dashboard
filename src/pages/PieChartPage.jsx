import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DynamicPieChart from "../components/DynamicPieChart";

const PieChartPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <DynamicPieChart />
        </main>
      </div>
    </div>
  );
};

export default PieChartPage;
