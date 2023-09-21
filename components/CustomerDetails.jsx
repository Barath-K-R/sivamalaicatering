import React from 'react'
import styles from '../styles/customerDetails.module.css'
const CustomerDetails = ({ setOpen, order }) => {
    const status = ["preparing", "on the way", "delivered"];
    const products = order.products
    const handleClick = () => {
        setOpen(false);
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button onClick={handleClick}>×</button>
                <div className={styles.item}>
                    <h1>Customer details</h1>
                    <span className={styles.customername}><b>Customer : </b>{order.customer}</span>
                    {products.map((p,index)=>{
                        return (
                        <span key={index}><b>Product {index +1} :</b> {p.title} * {p.quantity}</span>
                        )
                    })}
                    <span className={styles.customeraddress}><b>address : </b>{order.address}</span>
                    <span className={styles.customernumber}><b>phone : </b>{order.phone}</span>
                    <span className={styles.orderstatus}><b>status : </b>{status[order.status]}</span>
                    <span className={styles.customerpayment}><b>payment : </b> {order.method === 0 ? <span>cash</span> : <span>paid</span>}</span>
                </div>

            </div>
        </div>
    )
}

export default CustomerDetails