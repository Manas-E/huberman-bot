import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import ChatLine, { type ChatGPTMessage, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import ErrorModal from "./Modal";
import { signIn, signOut, useSession } from "next-auth/react";
import Typewriter from "./Typewriter";
const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content:
      "Hi! I am HubermanBot. Ask me anything about productivity, sleep or hypertrophy",
  },
];

const InputMessage = ({
  input,
  setInput,
  sendMessage,
  session,
  ...props
}: any) => (
  <div className="mt-2 md:mt-6 flex clear-both text-black">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0  flex-auto font-semibold appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
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
      {...props}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        if (session?.user) {
          sendMessage(input);
          setInput("");
        } else {
          signIn("google", { redirect: false });
        }
      }}
    >
      {session?.user ? "Ask" : "Sign in"}
    </Button>
  </div>
);

export function Chat() {
  const { data: session } = useSession();

  const initialMessages: ChatGPTMessage[] = session?.user
    ? [
        {
          role: "assistant",
          content: `Hi! ${
            session.user.name ?? ""
          } I am HubermanBot. Ask me anything about productivity, sleep or hypertrophy`,
        },
      ]
    : [
        {
          role: "assistant",
          content:
            "Hi! I am HubermanBot. Ask me anything about productivity, sleep or hypertrophy",
        },
      ];

  const firstName = session?.user?.name && session?.user?.name.split(" ")[0];
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    ...initialMessages,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    status: false,
  });
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
        const error = await response.text();
        console.log(error, "========");
        throw new Error(error);
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
    } catch (err: any) {
      setError({ message: err?.message, status: true });
      setLoading(false);
      console.log("error", err?.message);
    }
  };

  const [query, setQuery] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100); // Adjust typing speed here (in milliseconds)
  const [cursorVisible, setCursorVisible] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const texts = [
    "How to increase focus ?",
    "Methods to improve eyesight",
    "How to build a habit ?",
    "How to build strength ?",
  ];

  const showTypewriterEffect = !Boolean(query) && messages.length < 2;
  useEffect(() => {
    if (showTypewriterEffect) {
      const currentText = texts[currentTextIndex];
      let currentIndex = 0;
      let timeoutId: NodeJS.Timeout | null = null;

      const type = () => {
        setDisplayText((prevText) => currentText.substr(0, currentIndex));

        if (currentIndex < currentText.length) {
          currentIndex++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          setIsDeleting(true);
          timeoutId = setTimeout(erase, typingSpeed * 2);
        }
      };

      const erase = () => {
        setDisplayText((prevText) => currentText.substr(0, currentIndex));

        if (currentIndex > 0) {
          currentIndex--;
          timeoutId = setTimeout(erase, typingSpeed / 2);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          timeoutId = setTimeout(type, typingSpeed / 2);
        }
      };

      timeoutId = setTimeout(type, typingSpeed);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [currentTextIndex]);

  useEffect(() => {
    if (showTypewriterEffect) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prevVisible) => !prevVisible);
      }, 500); // Adjust cursor blinking speed here (in milliseconds)

      return () => {
        clearInterval(cursorInterval);
      };
    }
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
      {session && (
        <>
          <Button className="float-right" onClick={() => signOut()}>
            Sign out
          </Button>

          <ChatLine content={`Welcome ${firstName} 😄 `} session={session} />
        </>
      )}
      {messages.map((props, index) => (
        <ChatLine key={index} id={index + 1} session={session} {...props} />
      ))}
      {loading && <LoadingChatLine />}
      {error.status && (
        <ErrorModal
          error={error.message}
          onClose={() => setError({ ...error, status: false })}
        ></ErrorModal>
      )}
      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-primarytext clear-both ">
          Type a question to start the conversation
        </span>
      )}

      <InputMessage
        input={query}
        setInput={setQuery}
        sendMessage={sendMessage}
        session={session}
        ref={inputRef}
        placeholder={displayText}
      />
    </div>
  );
}
