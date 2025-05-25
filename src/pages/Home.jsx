import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ExcelTable from "../components/ExcelTable";
import Download from "../components/Download";
import SummaryCard from "../components/SummaryCard";

const Home = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Download />
          <SummaryCard />
          <ExcelTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
