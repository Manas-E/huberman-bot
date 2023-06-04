import clsx from "clsx";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import VideoCard from "./VideoCard";
import { memo } from "react";
import Avatar from "./Avatar";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            HubermanBot
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) => {
  console.log(text, "<<");
  return text?.split("\n")?.map((line, i) => (
    <span key={i} className="animate-typing">
      {line}
      <br />
    </span>
  ));
};

function ChatLine({ role = "assistant", content, metaData, id, session }) {
  if (!content) {
    return null;
  }
  console.log(content, "=======");
  const formatteMessage = convertNewLines(content);

  return (
    <div
    // className={`flex gap-2.5 relative ${
    //   role != "assistant" ? "left-10" : ""
    // }`}
    >
      <div
        id={"message-" + id}
        className={
          role != "assistant"
            ? "float-right clear-both"
            : "float-left clear-both  animate-slide-in-fade-in"
        }
      >
        <BalancerWrapper>
          <div
            className={
              role != "assistant"
                ? "flex gap-2.5 items-end relative right-[-50px]"
                : "flex flex-col"
            }
          >
            {/* {role == "assistant" && (
              <Avatar
                src={role != "assistant" ? session.user.image : "/avatar.png"}
              ></Avatar>
            )} */}
            <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
              <div className="flex space-x-3">
                <div className="flex-1 gap-4">
                  <p className="font-large text-xxl text-gray-900">
                    <a href="#" className="hover:underline">
                      {role == "assistant" ? "AI" : "You"}
                    </a>
                  </p>
                  <p
                    className={clsx(
                      "text ",
                      role == "assistant" ? "font-semibold " : "text-gray-400"
                    )}
                  >
                    {formatteMessage}
                  </p>
                </div>
              </div>
            </div>
            {role != "assistant" && (
              <Avatar
                src={role != "assistant" ? session.user.image : "/avatar.png"}
                className="mb-5 hidden md:block"
              ></Avatar>
            )}
            {role === "assistant" && metaData && (
              <VideoCard {...metaData}></VideoCard>
            )}
          </div>
        </BalancerWrapper>
      </div>
    </div>
  );
}

export default memo(ChatLine);
