import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({ item }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${item._id}`} passHref>
        <Image src={item.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{item.title}</h1>
      <span className={styles.price}>₹{item.price}</span>
      <p className={styles.desc}>{item.desc}</p>
    </div>
  );
};

export default PizzaCard;
