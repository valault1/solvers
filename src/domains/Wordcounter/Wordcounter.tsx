import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MainContainer } from "components/MainPage.elements";
import { useFileData } from "domains/Wordcounter/useFileData";
import { useFilteredDataPoints } from "domains/Wordcounter/useFilteredDataPoints";
import {
  BarChartContainer,
  CountContainer,
} from "domains/Wordcounter/styledComponents";

type WordcounterProps = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const Wordcounter = ({}: WordcounterProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const [dataFile, setDataFile] = React.useState<File>();
  const { allDataPoints } = useFileData(dataFile);
  const { totalWordCount, totalKeystrokes } =
    useFilteredDataPoints(allDataPoints);
  console.log({ dataFile, allDataPoints, totalWordCount, totalKeystrokes });

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <MainContainer>
        <input
          type="file"
          onChange={(evt) => setDataFile(evt.target.files[0])}
        />
        {!!totalWordCount && (
          <CountContainer>Total words typed: {totalWordCount}</CountContainer>
        )}
        {!!totalKeystrokes && (
          <CountContainer>Total keystrokes: {totalKeystrokes}</CountContainer>
        )}
        <BarChartContainer style={{ width: "50%" }}>
          <Bar options={options} data={data} />
        </BarChartContainer>
      </MainContainer>
    </>
  );
};
