import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ExcelTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch(
        "/src/Patient_Data_Sample__50_Rows_Filled_.xlsx"
      );
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    fetchExcel();
  }, []);

  return (
    <div className="overflow-auto max-h-[80vh] max-w-full p-4">
      <table className="min-w-[1000px] table-auto border border-gray-300">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2 border text-sm text-left">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border text-sm">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;
