// src/features/jobs/components/AreaChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "styled-components";
import type { MonthlyApplication } from "@/store/job/types";

interface AreaChartProps {
  data: MonthlyApplication[];
}

const AreaChartComponent = ({ data }: AreaChartProps) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="countGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.colors.primary[600]}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={theme.colors.primary[600]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="count"
          stroke={theme.colors.primary[600]}
          strokeWidth={2}
          fill="url(#countGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
