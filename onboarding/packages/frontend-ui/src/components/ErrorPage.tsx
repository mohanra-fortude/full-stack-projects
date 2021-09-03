import "../styles/ErrorPage.css";
import { Button } from "antd";
import styles from "../styles/style";

function ErrorPage() {
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div className="error">
      {/* <img src="../../Images/Logo.svg" alt="" /> */}
      <div className="message">
        <h1>404</h1>
        <h3>WE ARE SORRY, PAGE NOT FOUND! 😥 </h3>
        <Button
          onClick={goBack}
          className="button"
          type="primary"
          shape="round"
          value="large"
          style={styles.borderRadius}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
export default ErrorPage;
