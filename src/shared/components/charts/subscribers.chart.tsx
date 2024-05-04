"use client";
import { useEffect, useState } from "react";
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SubscribersAnalyticsData {
  month: string;
  count: number;
}

const SubscribersChart = () => {
  const { data: subscriberData, loading } = useSubscribersData();
  const [chartData, setChartData] = useState<SubscribersAnalyticsData[]>([]);

  useEffect(() => {
    if (!loading && subscriberData) {
      const now = new Date();
      const monthlyCounts: Record<string, number> = {};

      // Initialize months with zeros
      for (let i = 6; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = month.toLocaleString('default', { month: 'short', year: 'numeric' });
        monthlyCounts[monthKey] = 0; // Start all months at zero
      }

      // Accumulate counts per month
      subscriberData.forEach((subscriber: any) => {
        const month = new Date(subscriber.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (monthlyCounts.hasOwnProperty(month)) {
          monthlyCounts[month]++;
        }
      });

      // Convert the counts into an array for the chart
      const data: SubscribersAnalyticsData[] = Object.keys(monthlyCounts).map(month => ({
        month,
        count: monthlyCounts[month]
      }));

      setChartData(data);
    }
  }, [subscriberData, loading]);

  return (
    <div className="my-5 p-5 border rounded bg-white w-full md:h-[55vh] xl:h-[60vh]">
      <div className="w-full flex">
        <h3 className="font-medium">Active Subscribers</h3>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="opacity-[.5]">Shows all active subscribers</p>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#EB4898]" />
          <span className="pl-2 text-sm opacity-[.7]">Subscribers</span>
        </div>
      </div>
      {loading ? (
        <div className="h-[85%] flex items-center justify-center w-full">
          <h5>Loading...</h5>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={"85%"}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#EB4898" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SubscribersChart;
