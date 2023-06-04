import Image from "next/image";
import React, { memo } from "react";

function truncateString(str: string) {
  if (str.length > 70) {
    return str.slice(0, 70) + "...";
  } else {
    return str;
  }
}
function VideoCard(props) {
  const isThumbnail = props["thumbnails.high.url"];
  const onlyButton = !isThumbnail && !props.title && props.source;
  return (
    <div className="mb-5 min-w-[200px] md:min-w-[380px]">
      <h3 className="text-white text-xl font-semibold">Reference: </h3>
      {onlyButton ? (
        <div className="card-actions justify-end">
          <a href={props.source} target="_blank" rel="noreferrer">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm ">
              Watch
            </button>
          </a>
        </div>
      ) : (
        <div className="flex rounded-md p-2.5 bg-[#1393D0] shadow-white w-full md:w-4/5 h-40">
          {isThumbnail && (
            <Image
              width="0"
              height="0"
              sizes="100vw"
              style={{
                width: "50%",
                height: "100%",
                borderRadius: "5px",
              }}
              src={props["thumbnails.high.url"]}
              alt="Movie"
            />
          )}
          <div className="pl-5 flex flex-col justify-around">
            {props?.title && (
              <h2 className="card-title text-white font-semibold text-sm text-ellipsis">
                {truncateString(props.title)}
              </h2>
            )}
            {props.source && (
              <div className="card-actions justify-end">
                <a href={props.source} target="_blank" rel="noreferrer">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm ">
                    Watch
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(VideoCard);
