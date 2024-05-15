'use client';
import useSubscribersAnalytics from "@/shared/hooks/useSubscribersAnalytics";
import { ICONS } from "@/shared/utils/icons";
import useSubscribersData from "@/shared/hooks/useSubscribersData";

const DashboardOverViewCard = () => {
  // Get analytics data
  const { subscribersData, loading: analyticsLoading } = useSubscribersAnalytics();
  const { data: subscriberData, loading: subscriberLoading } = useSubscribersData();

  // Total subscribers count
  const totalSubscribersCount = subscriberData?.length || 0;

  // Extract the last two month's subscriber data
  const lastMonthSubscribers = !analyticsLoading && subscribersData?.last7Months?.[subscribersData.last7Months.length - 1];
  const previousLastMonthSubscribers = !analyticsLoading && subscribersData?.last7Months?.[subscribersData.last7Months.length - 2];

  // Calculate the percentage change
  let comparePercentage = 0;
  if (previousLastMonthSubscribers && previousLastMonthSubscribers.count > 0) {
    comparePercentage = ((lastMonthSubscribers.count - previousLastMonthSubscribers.count) / previousLastMonthSubscribers.count) * 100;
  } else if (lastMonthSubscribers && lastMonthSubscribers.count > 0) {
    comparePercentage = 100;
  }

  return (
    <div className="w-full xl:py-4 flex flex-col md:flex-row bg-white border rounded">
      {/* Subscribers */}
      <div className="w-full md:w-[33.33%] border-b md:border-b-0 md:border-r p-5 text-lg">
        <h5 className="text-lg">Subscribers</h5>
        <div className="flex items-center justify-between">
          <span className="font-medium pt-2">
          {subscriberLoading ? "..." : totalSubscribersCount}
          </span>
          <div className="flex p-2 items-center bg-[#DCFCE6] rounded-full">
            <span className="text-[#21C55D]">{ICONS.topArrow}</span>
            <span className="text-sm pl-1">{comparePercentage.toFixed(0)}%</span>
          </div>
        </div>
        <small className="text-sm opacity-[.7] pt-2">
        from {previousLastMonthSubscribers ? previousLastMonthSubscribers.count : 0} (last 4 weeks)
        </small>
      </div>
      {/* Open Rate */}
      <div className="w-full md:w-[33.33%] border-b md:border-b-0 md:border-r p-5 text-lg">
        <h5 className="text-lg">Open Rate</h5>
        <div className="flex items-center justify-between">
          <span className="font-medium pt-2">0%</span>
          <div className="flex p-3 items-center bg-[#F3F4F6] rounded-full">
            <span className="text-xl">-</span>
            <span className="text-sm pl-1">0%</span>
          </div>
        </div>
        <small className="text-sm opacity-[.7] pt-2">
          from 0% (last 4 weeks)
        </small>
      </div>
      {/* Click Rate */}
      <div className="w-full md:w-[33.33%] p-5 text-lg">
        <h5 className="text-lg">Click Rate</h5>
        <div className="flex items-center justify-between">
          <span className="font-medium pt-2">0%</span>
          <div className="flex p-3 items-center bg-[#F3F4F6] rounded-full">
            <span className="text-xl">-</span>
            <span className="text-sm pl-1">0%</span>
          </div>
        </div>
        <small className="text-sm opacity-[.7] pt-2">
          from 0% (last 4 weeks)
        </small>
      </div>
    </div>
  );
};

export default DashboardOverViewCard;
