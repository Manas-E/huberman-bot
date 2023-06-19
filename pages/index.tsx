import { Layout, Page, Text } from "@vercel/examples-ui";
import Image from "next/image";
import { Chat } from "../components/Chat";
import Modal from "../components/Modal";
import ErrorModal from "../components/Modal";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import Typewriter from "../components/Typewriter";

import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import db, { firestore } from "../firebase";

function Home(props: any) {
  const { data: session } = useSession();
  const [showGif, setShowGif] = useState(false);

  return (
    <Page className="flex flex-col gap-12 pt-0 md:py-16 justify-center">
      <Image
        src="/andrew.webp"
        width={400}
        height={300}
        className=" md:self-end"
        alt="Huberman Bot banner"
        priority
      ></Image>
      <section className="flex flex-col gap-6 px-4">
        <Text
          variant="h1"
          className="animate-typing text-[2rem] md:text-[3rem]"
        >
          Science based solutions for your problems
        </Text>
        <Text className="hub-text">
          Embark on an Enlightening Journey through Professor Andrew
          Huberman&apos;s Insights with HubermanBot, Your Personalized Chatbot
          Companion!
        </Text>
      </section>
      <section className="flex flex-col mx-4 gap-3 justify-center items-center">
        <Text variant="h2" className="hub-text ">
          HubermanBot
        </Text>
        <div className="lg:w-2/3 mt-5 lg:mt-0 flex justify-center mx--10">
          <Chat />
        </div>
      </section>
      <footer className="self-center cursor-pointer ">
        <Image
          src="/hello.gif"
          width={200}
          height={200}
          alt="Hello GIF"
          className={`border-8  border-primary translate-x-[-20%] mb-2.5 ${
            showGif ? "visible" : "invisible"
          }`}
        ></Image>
        <div
          className=" group transition duration-300 max-w-fit"
          onPointerEnter={() => setShowGif(true)}
          onPointerLeave={() => setShowGif(false)}
        >
          <a
            href="https://twitter.com/devBiceps"
            target="_blank"
            rel="noreferrer"
          >
            By Manas Sharma 💙
          </a>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600 "></span>
        </div>
      </footer>
    </Page>
  );
}
export const getServerSideProps = async (context: any) => {
  // Fetch data from an API or a database

  // Return the data as props

  return {
    props: {
      data: "",
    },
  };
};
Home.Layout = Layout;

export default Home;
