const isEven = (number: number) => number % 2 == 0;

export function CombineChatHistory(chatHistory: any) {
  let arr = "",
    str = "";
  // const chatHistory = data;
  for (let i = 0; i < chatHistory.length; i += 2) {
    str = "";

    if (chatHistory[i].role == "user" && isEven(i)) {
      str = chatHistory[i]?.content + " ? ";
    }
    if (chatHistory[i + 1].role == "assistant" && isEven(i)) {
      str += chatHistory[i + 1]?.content + "\n";
    }
    arr += str;
  }
  console.log("odd", arr);
  return arr;
}

const data = [
  { role: "user", content: "how to sleep fast" },
  {
    role: "assistant",
    content:
      " One way to help you fall asleep quickly is to use a Reverie app, which has a sleep script that can help you relax and transition to sleep. Additionally, it is important to create an environment that is low in light and temperature, and to avoid ingesting caffeine too close to bedtime.",
    metaData: {
      id: "nm1TxQj9IsQ",
      "loc.lines.from": 665,
      "loc.lines.to": 684,
      source:
        "https://www.youtube.com/watch?v=nm1TxQj9IsQ&ab_channel=AndrewHuberman",
      "thumbnails.default.height": 90,
      "thumbnails.default.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/default.jpg",
      "thumbnails.default.width": 120,
      "thumbnails.high.height": 360,
      "thumbnails.high.url": "https://i.ytimg.com/vi/nm1TxQj9IsQ/hqdefault.jpg",
      "thumbnails.high.width": 480,
      "thumbnails.maxres.height": 720,
      "thumbnails.maxres.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/maxresdefault.jpg",
      "thumbnails.maxres.width": 1280,
      "thumbnails.medium.height": 180,
      "thumbnails.medium.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/mqdefault.jpg",
      "thumbnails.medium.width": 320,
      "thumbnails.standard.height": 480,
      "thumbnails.standard.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/sddefault.jpg",
      "thumbnails.standard.width": 640,
      title:
        "Master Your Sleep & Be More Alert When Awake | Huberman Lab Podcast #2",
    },
  },
  { role: "user", content: "explain more" },
  {
    role: "assistant",
    content:
      " Taking magnesium threonate and theanine 30 to 60 minutes before sleep can help people fall asleep quickly. Additionally, taking naps, practicing yoga nidra, meditating, and using hypnosis scripts can help people relax and fall asleep.",
    metaData: {
      id: "nm1TxQj9IsQ",
      "loc.lines.from": 665,
      "loc.lines.to": 684,
      source:
        "https://www.youtube.com/watch?v=nm1TxQj9IsQ&ab_channel=AndrewHuberman",
      "thumbnails.default.height": 90,
      "thumbnails.default.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/default.jpg",
      "thumbnails.default.width": 120,
      "thumbnails.high.height": 360,
      "thumbnails.high.url": "https://i.ytimg.com/vi/nm1TxQj9IsQ/hqdefault.jpg",
      "thumbnails.high.width": 480,
      "thumbnails.maxres.height": 720,
      "thumbnails.maxres.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/maxresdefault.jpg",
      "thumbnails.maxres.width": 1280,
      "thumbnails.medium.height": 180,
      "thumbnails.medium.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/mqdefault.jpg",
      "thumbnails.medium.width": 320,
      "thumbnails.standard.height": 480,
      "thumbnails.standard.url":
        "https://i.ytimg.com/vi/nm1TxQj9IsQ/sddefault.jpg",
      "thumbnails.standard.width": 640,
      title:
        "Master Your Sleep & Be More Alert When Awake | Huberman Lab Podcast #2",
    },
  },
];
