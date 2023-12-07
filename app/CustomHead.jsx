import Head from "next/head";

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>Shardmind AI -{title}</title>
    </Head>
  );
};

export default CustomHead;
