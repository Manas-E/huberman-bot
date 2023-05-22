import { Layout, Page, Text } from "@vercel/examples-ui";
import Image from "next/image";
import { Chat } from "../components/Chat";

function Home(props: any) {
  return (
    <Page className="flex flex-col gap-12 pt-0 md:py-16 ">
      <Image
        src="/andrew.webp"
        width={400}
        height={300}
        className=" md:self-end"
        alt="banner"
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
          A Knowledge bot based upon Huberman lab's podcast
        </Text>
      </section>

      <section className="flex flex-col px-4 gap-3 justify-center items-center">
        <Text variant="h2" className="hub-text ">
          HubermanBot
        </Text>
        <div className="lg:w-2/3 mt-5 lg:mt-0 flex justify-center ">
          <Chat />
        </div>
      </section>
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
