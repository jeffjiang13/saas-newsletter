import { manageSubscription } from "@/actions/manage.subscription";
import useGetMembership from "@/shared/hooks/useGetMembership";
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import { ICONS } from "@/shared/utils/icons";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const UserPlan = () => {
  const { data, loading } = useSubscribersData();
  const { data: membershipData, loading: membershipLoading } = useGetMembership();
  const history = useRouter();
  const handleManage = async () => {
    await manageSubscription({
      customerId: membershipData?.stripeCustomerId,

    }).then((res: any) => {
      history.push(res);
    });
  };
  return (
    <div className="w-full my-3 p-3 bg-[#FDF1F8] rounded hover:shadow-xl cursor-pointer">
      <div className="w-full flex items-center">
        <h5 className="text-lg font-medium">
          {membershipLoading ? "..." : membershipData?.plan} Plan
        </h5>
        <div
          className="w-[95px] overflow-hidden p-2 shadow ml-2 cursor-pointer h-[32px] flex items-center space-x-1 rounded-lg bg-[#E77CAE] text-white hover:bg-pink-300 hover:text-yellow-300 hover:bg-"
          onClick={handleManage}
        >
          <span className="text-xl flex-shrink-0">{ICONS.electric}</span>
          <span className="text-sm truncate">Upgrade</span>
        </div>
      </div>
      <h5 className="text-[#831743]">Total subscribers</h5>
      <Slider
        aria-label="Player progress"
        hideThumb={true}
        defaultValue={1}
        className="max-w-md"
      />
      <h6 className="text-[#831743]">
        {loading ? "..." : data?.length} of{" "}
        {membershipData?.status === "Cancelled" ? "100" :
          membershipData?.plan === "LAUNCH" ? "2,500" :
          membershipData?.plan === "GROW" ? "10,000" :
          membershipData?.plan === "SCALE" ? "100,000" : "0"}
        {" "}added
      </h6>
    </div>
  );
};

export default UserPlan;
