import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import CustomerDetails from "../../components/CustomerDetails.jsx";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders }) => {

  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];
  const [open, setOpen] = useState(false);
  const [ord,setOrd]=useState(null)
  
  const handleClick=(order)=>{
    setOpen(true);
    setOrd(order)
    
  }
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Link href='/admin/productsList' passHref>
        <button className={styles.productsbutton}>Products</button>
      </Link>


      {/* orders list */}
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>no</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order,index) => (
           
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{index+1}</td>
              <td onClick={()=>{handleClick(order)}}>{order.customer}</td>
                
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
             
          ))}
        </table>
      
      </div>
      {open ?<CustomerDetails setOpen={setOpen} order={ord}/>: ""}
    </div>
  );
};

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

  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data

    },
  };
};

export default Index;
