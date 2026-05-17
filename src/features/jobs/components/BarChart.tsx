// src/features/jobs/components/BarChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "styled-components";
import type { MonthlyApplication } from "@/store/job/types";

interface BarChartProps {
  data: MonthlyApplication[];
}

const BarChartComponent = ({ data }: BarChartProps) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.grey[100]} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: theme.colors.grey[500] }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: theme.colors.grey[500] }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.colors.grey[200]}`,
            fontSize: "0.875rem",
          }}
        />
        <Bar
          dataKey="count"
          fill={theme.colors.primary[600]}
          radius={[4, 4, 0, 0]}
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
