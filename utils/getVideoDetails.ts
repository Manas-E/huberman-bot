import Youtube from "youtube-api";
// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts

export async function getDetails(id: string) {
  await Youtube.authenticate({
    type: "key",
    key: process.env.YOUTUBE_API_KEY,
  });
  let details = await Youtube.videos.list({
    part: "snippet,contentDetails,statistics",
    id,
  });
  console.log(details.data);
  return details.data;
}
