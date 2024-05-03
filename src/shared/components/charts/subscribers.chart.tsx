"use client";
import { subscribersAnalytics } from "@/actions/subscribers.analytics";
import useSubscribersAnalytics from "@/shared/hooks/useSubscribersAnalytics";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface subscribersAnalyticsData {
  month: string;
  count: string;
}

const SubscribersChart = () => {
  const { subscribersData, loading } = useSubscribersAnalytics();

  const data: subscribersAnalyticsData[] = [];

  subscribersData &&
    subscribersData?.last7Months?.forEach((item: subscribersAnalyticsData) => {
      data.push({
        month: item?.month,
        count: item?.count,
      });
    });

  // const data = [
  //   {
  //     month: "Jan 2024",
  //     count: 2400,
  //   },
  //   {
  //     month: "Feb 2024",
  //     count: 1398,
  //   },
  //   {
  //     month: "March 2024",
  //     count: 9800,
  //   },
  //   {
  //     month: "April 2024",
  //     count: 3908,
  //   },
  //   {
  //     month: "May 2024",
  //     count: 4800,
  //   },
  //   {
  //     month: "Jun 2024",
  //     count: 3800,
  //   },
  //   {
  //     month: "July 2024",
  //     count: 4300,
  //   },
  // ];

  return (
    <div className="my-5 p-5 border rounded bg-white w-full">
      <div className="w-full flex justify-between">
        <h3 className="font-medium">Active Subscribers</h3>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#EB4898]" />
          <span className="pl-2 text-sm opacity-[.7]">Subscribers</span>
        </div>
      </div>
      <p className="opacity-[.5] text-sm">Shows all active subscribers</p>
      {loading ? (
        <div className="h-[85%] flex items-center justify-center w-full">
          <h5>Loading...</h5>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#EB4898"
              fill="#EB4898"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SubscribersChart;
