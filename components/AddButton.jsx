import styles from "../styles/Add.module.css";

const AddButton = ({ setOpen }) => {
  return (
    <div onClick={() => setOpen(true)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;