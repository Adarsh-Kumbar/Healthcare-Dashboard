import React from "react";

const SummaryCard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <Card label="Total Patients" value="50" />
      <Card label="Average Age" value="42.1" />
      <Card label="Male Patients" value="26" />
      <Card label="Female Patients" value="24" />
      <Card label="Unique Diagnoses" value="7" />
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h3 className="text-sm text-gray-500">{label}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default SummaryCard;
