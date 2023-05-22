import { getDetails } from "./getVideoDetails";

export async function metaFromData(id: string) {
  const videoData = await getDetails(id);

  console.log(videoData);

  const snippet = videoData?.items[0]?.snippet;

  return {
    thumbnails: snippet?.thumbnails,
    title: snippet?.title,
    description: snippet?.description,
    channel: snippet?.channelTitle,
  };
}
