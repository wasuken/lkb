import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ItemInput from "../components/ItemInput";
import ItemList from "../components/ItemList";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lightweight Kakei Book</title>
        <meta name="description" content="ローカルストレージによる軽量家計簿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemInput />
      <hr />
      <ItemList />
    </div>
  );
};

export default Home;
