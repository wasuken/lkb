import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChartYMD from "../containers/ChartYMD";
import Header from "../components/Header";

const Chart: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lightweight Kakei Book</title>
        <meta name="description" content="ローカルストレージによる軽量家計簿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Header></Header>
      <ChartYMD />
    </div>
  );
};

export default Chart;