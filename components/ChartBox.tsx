import { ChartBoxProps } from "../types/props";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

function genBarData(header: string[], data: number[]) {
  return {
    labels: header,
    datasets: [
      {
		id: 1,
        label: "Dataset",
        data: data,
      },
    ],
  };
}

export default function ChartBox(props: ChartBoxProps) {
  return <Chart type="line" data={genBarData(props.header, props.data)} />;
}
