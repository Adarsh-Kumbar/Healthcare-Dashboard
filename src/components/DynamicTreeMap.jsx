import React, { useEffect, useState } from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";
import * as XLSX from "xlsx";
import { scaleSequential } from "d3-scale";
import { interpolateReds } from "d3-scale-chromatic";

const DynamicTreeMap = () => {
  const [data, setData] = useState(null);
  const [hierarchyMode, setHierarchyMode] = useState("location");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "/src/Patient_Data_Sample__50_Rows_Filled_.xlsx"
      );
      const blob = await response.arrayBuffer();
      const workbook = XLSX.read(blob, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      const buildHierarchy = () => {
        if (hierarchyMode === "location") {
          const root = { name: "Cancer Cases", children: [] };
          const states = {};

          json.forEach((row) => {
            const state = row.state_name || "Unknown State";
            const city = row.city_name || "Unknown City";
            const cancerType =
              row.cancer_kind || row.blood_cancer_type || "Unknown";
            const spreadRate = parseFloat(row.disease_spread_rate) || 0;
            const cancerCount = parseInt(row.cancer_num) || 1;

            if (!states[state]) states[state] = {};
            if (!states[state][city]) states[state][city] = {};

            if (!states[state][city][cancerType]) {
              states[state][city][cancerType] = {
                value: 0,
                spreadRates: [],
              };
            }
            states[state][city][cancerType].value += cancerCount;
            states[state][city][cancerType].spreadRates.push(spreadRate);
          });

          for (const [state, cities] of Object.entries(states)) {
            const cityNodes = Object.entries(cities).map(([city, types]) => ({
              name: city,
              children: Object.entries(types).map(([type, stats]) => ({
                name: type,
                value: stats.value,
                spreadRate:
                  stats.spreadRates.reduce((a, b) => a + b, 0) /
                  stats.spreadRates.length,
              })),
            }));
            root.children.push({ name: state, children: cityNodes });
          }

          setData(root);
        } else {
          const root = { name: "Cancer Pathways", children: [] };
          const conditions = {};

          json.forEach((row) => {
            const condition =
              row.cancer_kind || row.blood_cancer_type || "Unknown Condition";
            const diseaseType = row.disease_manner || "Unknown Disease Type";
            const hospitalChar =
              row.hospital_type + ", " + row.hospital_owner ||
              "Unknown Hospital";
            const treatment =
              (row.ambulance_present === "Yes" ? "Ambulance" : "") +
                (row.helicopter_available === "Yes" ? ", Helicopter" : "") ||
              "No Treatment";

            const spreadRate = parseFloat(row.disease_spread_rate) || 0;
            const cancerCount = parseInt(row.cancer_num) || 1;

            if (!conditions[condition]) conditions[condition] = {};
            if (!conditions[condition][diseaseType])
              conditions[condition][diseaseType] = {};
            if (!conditions[condition][diseaseType][hospitalChar])
              conditions[condition][diseaseType][hospitalChar] = {};

            if (!conditions[condition][diseaseType][hospitalChar][treatment]) {
              conditions[condition][diseaseType][hospitalChar][treatment] = {
                value: 0,
                spreadRates: [],
              };
            }

            const target =
              conditions[condition][diseaseType][hospitalChar][treatment];
            target.value += cancerCount;
            target.spreadRates.push(spreadRate);
          });

          for (const [condition, diseases] of Object.entries(conditions)) {
            const diseaseNodes = Object.entries(diseases).map(
              ([disease, hospitals]) => ({
                name: disease,
                children: Object.entries(hospitals).map(
                  ([hospital, treatments]) => ({
                    name: hospital,
                    children: Object.entries(treatments).map(
                      ([treatment, stats]) => ({
                        name: treatment,
                        value: stats.value,
                        spreadRate:
                          stats.spreadRates.reduce((a, b) => a + b, 0) /
                          stats.spreadRates.length,
                      })
                    ),
                  })
                ),
              })
            );
            root.children.push({ name: condition, children: diseaseNodes });
          }

          setData(root);
        }
      };

      buildHierarchy();
    };

    fetchData();
  }, [hierarchyMode]);

  const colorScale = scaleSequential([0, 1], interpolateReds);

  const getNodeColor = (node) => {
    if (hierarchyMode === "location") {
      if (!node.children || node.children.length === 0) {
        const name = node.data.name?.toLowerCase() || "";
        if (name.includes("benign")) return "#add8e6";
        if (name.includes("malignant")) return "#4682b4";
        return "#ffffff";
      }
      return "#ffffff";
    }

    if (hierarchyMode === "condition") {
      const depth = node.path.split(".").length;

      if (depth >= 5) return getHospitalColor(node.parent?.data?.name || "");

      if (depth === 4) return getHospitalColor(node.data.name || "");

      return "#ffffff";
    }

    return "#ffffff";
  };

  const getHospitalColor = (name) => {
    name = name.toLowerCase();
    if (name.includes("private")) return "#fca5a5"; 
    if (name.includes("govt") || name.includes("government")) return "#fde68a"; 
    return "#e5e7eb"; 
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tree Graph</h2>
        <select
          className="border rounded px-3 py-1"
          value={hierarchyMode}
          onChange={(e) => setHierarchyMode(e.target.value)}
        >
          <option value="location">By State → City → Cancer Type</option>
          <option value="condition">
            By Condition → Disease → Hospital → Treatment
          </option>
        </select>
      </div>

      {data ? (
        <div className="h-[80vh]">
          <ResponsiveTreeMap
            data={data}
            identity="name"
            value="value"
            innerPadding={3}
            outerPadding={5}
            labelSkipSize={12}
            labelTextColor="#0a0909"
            colors={(node) => getNodeColor(node)}
            borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
            animate={true}
            motionConfig="stiff"
          />
        </div>
      ) : (
        <div className="text-gray-950">Loading tree data...</div>
      )}
    </div>
  );
};

export default DynamicTreeMap;
