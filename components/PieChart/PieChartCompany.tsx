import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

// Register the required elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

interface CompanyData {
  pendingStudents: number;
  selectedStudents: number;
  rejectedStudents: number;
}

interface PieChartProps {
  data: CompanyData;
}

const PieChartCompany: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      "Selected Students " + data.selectedStudents,
      "Pending Students " + data.pendingStudents,
      "Rejected Students " + data.rejectedStudents,
    ],
    datasets: [
      {
        label: "University Data",
        data: [
          data.selectedStudents,
          data.pendingStudents,
          data.rejectedStudents,
        ],
        backgroundColor: [
          "rgba(0, 128, 0, 0.2)", // Green
          "rgba(255, 255, 0, 0.2)", // Yellow
          "rgba(255, 0, 0, 0.2)", // Red
        ],
        borderColor: [
          "rgba(0, 128, 0, 1)", // Green
          "rgba(255, 255, 0, 1)", // Yellow
          "rgba(255, 0, 0, 1)", // Red
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-10 rounded shadow-lg" style={{ width: "450px" }}>
      <h2 className="text-4xl text-center">Students Data</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartCompany;
