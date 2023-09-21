import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";
import {  useSelector } from "react-redux";
const OrderDetail = ({ total,createOrder,setCash}) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone,setPhone]=useState("")
  const cart = useSelector((state) => state.cart);
  const products=cart.products;
  const handleClose=()=>{
    setCash(false)
  }

  const handleClick = () => {
    createOrder({ customer,phone,address,products, total, method: 0 });
  };
 

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <span className={styles.close} onClick={handleClose}>&times;</span>
        <h1 className={styles.title}>Your details</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
           
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
