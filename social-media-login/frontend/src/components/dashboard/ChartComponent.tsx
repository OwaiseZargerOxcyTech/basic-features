import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
    { day: 'SUN', income: 100, expense: 50 },
    { day: 'MON', income: 80, expense: 40 },
    { day: 'TUE', income: 95, expense: 70 },
    { day: 'WED', income: 87, expense: 80 },
    { day: 'THU', income: 95, expense: 90 },
    { day: 'FRI', income: 80, expense: 40 },
    { day: 'SAT', income: 70, expense: 55 },
  ];
  
  const chartSetting = {
    width: 550,
    height: 400,
  };

  const valueFormatter = (value: number | null) => `$${value}`;

export const ChartComponent = () => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'day', }]}
            series={[
                { dataKey: 'income', label: 'Income', valueFormatter, color: "#08bd3c" },
                { dataKey: 'expense', label: 'Expense', valueFormatter, color: "#fd5353" }
            ]}
            layout="vertical"
            {...chartSetting}
            borderRadius={10}
        />
    )
}