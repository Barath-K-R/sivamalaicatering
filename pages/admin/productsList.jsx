import React from 'react'
import axios from "axios";
import styles from "../../styles/productsList.module.css";
import { useState } from 'react';
import Image from 'next/image';
const productsList = ({products}) => {
  const [pizzaList, setPizzaList] = useState(products);
  console.log(products)

  const handleDelete =
    async (id) => {
      console.log(id);
      try {
        const res = await axios.delete(
          "http://localhost:3000/api/products/" + id
        );
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      } catch (err) {
        console.log(err);
      }
    };
    
  return (
    <div className={styles.container}>
         {/* products list */}
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product.title}</td>
                <td>₹{product.price}</td>
                <td className={styles.buttonColumn}>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
  
    if (myCookie.token !== process.env.TOKEN) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
    
    const productRes = await axios.get("http://localhost:3000/api/products");
   
  
    return {
      props: {
        products: productRes.data,
      },
    };
  };
  
export default productsList