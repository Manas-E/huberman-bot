import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import ChatLine, { type ChatGPTMessage, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "Hi! I am HubermanBot. Ask me anything!",
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-2 md:mt-6 flex clear-both text-black">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto font-semibold appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Ask
    </Button>
  </div>
);

export function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);

    if (!query) {
      alert("Please input a question");
      return;
    }

    setAnswer("");
    setLoading(true);

    const question = query.trim();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory: messages.slice(-6),
        }),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const res = await response.json();
      const metaData = res.sourceDocuments[0].metadata;
      if (res.text) {
        setAnswer(res.text);
      }
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: res.text,
          metaData: metaData,
        } as ChatGPTMessage,
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const [query, setQuery] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSearch() {
    if (!query) {
      alert("Please input a question");
      return;
    }

    setAnswer("");
    setLoading(true);

    const question = query.trim();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const res = await response.json();

      if (res.text) {
        setAnswer(res.text);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (messages.length == 1) return;
    const lastElement = "message-" + messages.length;
    const element = document.getElementById(lastElement);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [messages]);

  return (
    <div className="rounded-2xl  lg:p-6 text-black">
      {messages.map((props, index) => (
        <ChatLine key={index} id={index + 1} {...props} />
      ))}

      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-primarytext clear-both ">
          Type a question to start the conversation
        </span>
      )}
      <InputMessage
        input={query}
        setInput={setQuery}
        sendMessage={sendMessage}
      />
    </div>
  );
}
