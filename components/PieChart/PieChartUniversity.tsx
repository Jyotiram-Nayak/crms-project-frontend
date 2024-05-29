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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

interface UniversityData {
  selectedStudents: number;
  pendingStudents: number;
}

interface PieChartProps {
  data: UniversityData;
}

const PieChartUniversity: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: ["Selected Students "+data.selectedStudents, "Pending Students "+data.pendingStudents],
    datasets: [
      {
        label: "University Data",
        data: [data.selectedStudents, data.pendingStudents],
        backgroundColor: ["rgba(0, 128, 0, 0.2)", "rgba(255, 255, 0, 0.2)"],
        borderColor: ["rgba(0, 128, 0, 1)", "rgba(255, 255, 0, 1)"],
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

export default PieChartUniversity;
