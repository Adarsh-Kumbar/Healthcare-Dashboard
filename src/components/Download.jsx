import React from "react";

const Download = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/src/Patient_Data_Sample__50_Rows_Filled_.xlsx"; 
    link.download = "Patient_Data_Sample__50_Rows_Filled_.xlsx";
    link.click();
  };
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Patient Dashboard
      </h2>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download Excel
      </button>
    </div>
  );
};

export default Download;
