import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import ItemList from "../components/ItemList.jsx";
import styles from "../styles/Home.module.css";
import AddButton from "../components/AddButton.jsx";
import Add from "../components/Add.jsx";
import axios from "axios";
import { useState } from "react";

export default function Home({itemList,admin}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Sivamalai catering</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {<AddButton setOpen={setOpen} />}
      <ItemList itemList={itemList}/>
      {open && <Add setOpen={setOpen} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      itemList: res.data,
      admin,
    },
  };
};
