// Commenting the file because of build error

// import  Youtube from "youtube-api";

export async function getDetails(id: string) {
  // await Youtube.authenticate({
  //   type: "key",
  //   key: process.env.YOUTUBE_API_KEY,
  // });
  // let details = await Youtube.videos.list({
  //   part: "snippet,contentDetails,statistics",
  //   id,
  // });
  // console.log(details.data);
  // return details.data;

  return {
    items: [
      {
        snippet: {
          channelTitle: "",
          description: "",
          title: "",
          thumbnails: "",
        },
      },
    ],
  };
}
