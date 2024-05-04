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

      for (let i = 6; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = month.toLocaleString('default', { month: 'short', year: 'numeric' });
        monthlyCounts[monthKey] = 0;
      }

      subscriberData.forEach((subscriber: any) => {
        const month = new Date(subscriber.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (monthlyCounts.hasOwnProperty(month)) {
          monthlyCounts[month]++;
        }
      });

      const data = Object.keys(monthlyCounts).map(month => ({
        month,
        count: monthlyCounts[month]
      }));
      setChartData(data);
    }
  }, [subscriberData, loading]);

  return (
    <div className="w-full mt-3 px-4 py-5 border rounded bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg sm:text-base">Active Subscribers</h3>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#EB4898]" />
          <span className="pl-2 text-xs opacity-70">Subscribers</span>
        </div>
      </div>
      <p className="text-xs opacity-50 mb-4">Shows all active subscribers</p>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span>Loading...</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} tickLine={false} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#EB4898" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SubscribersChart;
