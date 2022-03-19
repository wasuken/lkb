import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChartYMD from "../containers/ChartYMD";
import Header from "../components/Header";
import MonthChart from "../containers/MonthChart";

const Month: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lightweight Kakei Book</title>
        <meta name="description" content="ローカルストレージによる軽量家計簿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Header></Header>
	  <MonthChart />
    </div>
  );
};

export default Month;
