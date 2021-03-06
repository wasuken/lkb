import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ItemInput from "../containers/ItemInput";
import ItemList from "../containers/ItemList";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lightweight Kakei Book</title>
        <meta name="description" content="ローカルストレージによる軽量家計簿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Header></Header>
      <ItemInput />
      <div className="p-2"></div>
      <ItemList />
    </div>
  );
};

export default Home;
