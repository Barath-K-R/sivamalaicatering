import styles from "../styles/Cart.module.css";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import { useState } from "react";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";
import { reset } from "../redux/cartSlice";
import { useRouter } from "next/router";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const router = useRouter();
  
  const createOrder = async (data) => {
    console.log("order is creating")
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>

          {/* first row headings*/}
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {/* second row headings*/}
          {cart.products.map((product,index) => (
            <tr className={styles.tr} key={index}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{product.title}</span>
              </td>
              <td>
                <span className={styles.price}>${product.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>${product.price * product.quantity}</span>
              </td>
            </tr>
          ))}


        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>

          {/*checkout and cashon deliver and googlepay*/}
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "1",
                    currencyCode: "USD",
                    countryCode: "US",
                  },
                  shippingAddressRequired: true,
                  callbackIntents: ["PAYMENT_AUTHORIZATION"],
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log(paymentRequest);
                }}
                onPaymentAuthorized={paymentData => {
                  console.log('paymentData ' + paymentData);
                  return { transactionState: 'SUCCESS' }
                }}
                existingPaymentMethodRequired='false'
                buttonColor="black"
                buttonType="pay"
              ></GooglePayButton>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}


        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} setCash={setCash} />}
    </div>
  );
};

export default Cart;
