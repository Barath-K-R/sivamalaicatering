import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  
  const [price, setPrice] = useState(pizza.price);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

 const handleClick = () => {
  pizza.quantity=quantity;
  console.log(pizza)
    dispatch(addProduct({...pizza}));
  };

  return (
    <div className={styles.container}>

      {/*left side product image*/}
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>

      {/*right side product details*/}
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <div className={styles.add}>
        <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
         <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
