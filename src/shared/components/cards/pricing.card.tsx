import { stripeSubscribe } from "@/actions/stripe.subscribe";
import { GrowPlan, freePlan, scalePlan } from "@/app/configs/constants";
import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PricingCard = ({ active }: { active: string }) => {
  const { user } = useUser();
  const history = useRouter();
  const handleSubscription = async ({ price }: { price: string }) => {
    await stripeSubscribe({ price: price, userId: user?.id! }).then(
      (res: any) => {
        history.push(res);
      }
    );
  };

  return (
    <div id="pricing" className="w-full flex flex-col md:flex-row items-stretch justify-around py-8">
      {/* Pricing cards go here, example with one card shown: */}
      <div className="md:w-[400px] flex flex-col bg-white rounded p-5 my-5 md:my-0">
        <div className="flex-grow">
          {/* Card content */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="33"
            fill="string"
            className="mb-4"
          >
            <path
              fill="#fff"
              stroke="#3843D0"
              stroke-width="3"
              d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
            ></path>
          </svg>
          <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
            Launch
          </h5>
          <br />
          <div className="border-b pb-8 border-[#000]">
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">
              $0
            </h5>
            <p className="text-lg">No commitment</p>
          </div>
          <div className="pt-5">
            <p className="text-xl">What&apos;s included...</p>
          </div>
          {freePlan.map((i: PlanType, index: number) => (
            <div key={index} className="flex w-full items-center py-4">
              <span className="text-xl">{ICONS.right}</span>
              <p className="pl-2 text-lg">{i.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <Button className="w-full text-xl !py-6 bg-[#3843D0] text-white">
            <Link href={"/dashboard"}>
            Get Started
            </Link>
          </Button>
          <p className="pt-1 opacity-[.7] text-center">
            30-day free trial of Scale features, then free forever
          </p>
        </div>
      </div>

      {/* growth plan */}

      <div className="md:w-[400px] flex flex-col bg-white rounded p-5 my-5 md:my-0">
        <div className="flex-grow">
          {/* Card content */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="33"
            fill="string"
            className="mb-4"
          >
            <path
              fill="#fff"
              stroke="#3843D0"
              stroke-width="3"
              d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
            ></path>
          </svg>
          <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
            GROW
          </h5>
          <br />
          <div className="border-b pb-8 border-black">
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">
              ${active === "Monthly" ? "49" : "42"} /month
            </h5>
            <p className="text-lg">Billed {active}</p>
          </div>
          <div className="pt-5">
            <p className="text-xl">Everything in Launch, plus...</p>
          </div>
          {GrowPlan.map((i: PlanType, index: number) => (
            <div key={index} className="flex w-full items-center py-4">
              <span className="text-xl">{ICONS.right}</span>
              <p className="pl-2 text-lg">{i.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <Button
            className="w-full text-xl !py-6 bg-[#3843D0] text-white"
            onClick={() =>
              handleSubscription({
                price:
                  active === "Monthly"
                    ? "price_1PBmHGCKQ4GWi19n2Qwdh4IF"
                    : "price_1PC7BwCKQ4GWi19nMNqyKXAw",
              })
            }
          >
            Get Started
          </Button>
          <p className="pt-1 opacity-[.7] text-center">
            30-day free trial of Scale features, then $
            {active === "Monthly" ? "42" : "49"}/mo
          </p>
        </div>
      </div>

      {/* scale plan */}
      <div className="md:w-[400px] bg-white rounded p-5 my-5 md:my-0">
        <div className="flex-grow">
          {/* Card content */}
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" fill="string" className="flex-shrink-0 mb-4">
            <path fill="#fff" stroke="#3843D0" stroke-width="3" d="M34.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L3.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 14.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"></path>
            <path fill="#fff" stroke="#3843D0" stroke-width="3" d="M26.378 13.237a6.512 6.512 0 0 1 0 6.526l-.862 1.488a6.512 6.512 0 0 1-5.635 3.249h-1.762a6.512 6.512 0 0 1-5.635-3.25l-.862-1.487a6.512 6.512 0 0 1 0-6.526l.862-1.488A6.512 6.512 0 0 1 18.119 8.5h1.762a6.512 6.512 0 0 1 5.635 3.25l.862 1.487Z"></path>
          </svg>
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
              SCALE
            </h5>
            <br />
            <div className="border-b pb-8 border-[#000]">
              <h5 className="font-clashDisplay uppercase text-cyber-ink text-3xl">
                ${active === "Monthly" ? "99" : "84"} /month
              </h5>
              <p className="text-lg">Billed {active}</p>
            </div>
            <div className="pt-5">
              <p className="text-xl">Everything in Growth, plus...</p>
            </div>
            {scalePlan.map((i: PlanType, index: number) => (
              <div key={index} className="flex w-full items-center py-4">
                <span className="text-xl">{ICONS.right}</span>
                <p className="pl-2 text-lg">{i.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <Button
              className="w-full text-xl !py-6 bg-[#3843D0] text-white"
              onClick={() =>
                handleSubscription({
                  price:
                    active === "Monthly"
                      ? "price_1PBmIiCKQ4GWi19nK1OUkkj2"
                      : "price_1PC7DeCKQ4GWi19nsZykg902",
                })
              }
            >
              Get Started
            </Button>
            <p className="pt-1 opacity-[.7] text-center">
              30-day free trial of Scale features, then $
              {active === "Monthly" ? "99" : "84"}/mo
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default PricingCard;
