import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../../Components/Common/Button";
import TextInput from "../../Components/Common/TextInput";
import styles from "./styles.module.scss";
import { addUser, hasUser, validateUser } from "../../providers/User";
import { useNavigate } from "react-router";
import { DASHBOARD_PATH, LOGIN_PASSWORD_LENGTH } from "../../constants";
import { setUserInLS } from "../../utils/common";

const OnBoard = () => {
  const [flow, setFlow] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleFlow = () => {
    setFlow((old) => (old === "login" ? "signup" : "login"));
  };
  const isLoginFlow = flow === "login";
  const [userData, setUserData] = useState<any>({});
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const enableCTA = () => {
    const { username = "", password = "", confirmPassword = "" } = userData;
    if (isLoginFlow) {
      return !!username && password.length >= LOGIN_PASSWORD_LENGTH;
    }
    return (
      !!username &&
      password.length >= LOGIN_PASSWORD_LENGTH &&
      !!confirmPassword &&
      !!userData?.name
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { username, password, confirmPassword } = userData;
    if (isLoginFlow) {
      const result = validateUser(username, password);
      if (result.found) {
        setUserInLS(result.user);
        navigate(DASHBOARD_PATH);
      } else {
        setError(result.message);
      }
    } else {
      if (password === confirmPassword) {
        if (hasUser(username)) {
          setError("Username already exists");
        } else {
          const newUser = {
            username,
            password,
            name: userData.name,
          };
          addUser(username, newUser);
          setUserInLS(newUser);
          navigate(DASHBOARD_PATH);
        }
      } else {
        setError("Passwords not matching");
      }
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.leftView}>
        <h1>Test dashboard</h1>
      </section>
      <form onSubmit={onSubmit} className={styles.rightView}>
        <div className={styles.contents}>
          <h1>{isLoginFlow ? "Login" : "Signup"}</h1>

          <TextInput
            name="username"
            className={styles.input}
            placeholder={isLoginFlow ? "Enter Username" : "Create Username"}
            onChange={onChange}
          />
          <TextInput
            name="password"
            className={styles.input}
            placeholder={isLoginFlow ? "Enter Password" : "Create Password"}
            type="password"
            onChange={onChange}
          />
          {!isLoginFlow && (
            <>
              <TextInput
                name="confirmPassword"
                className={styles.input}
                placeholder={"Confirm Password"}
                type="password"
                onChange={onChange}
              />
              <TextInput
                name="name"
                className={styles.input}
                placeholder={"Enter Name"}
                onChange={onChange}
              />
            </>
          )}
          <Button
            className={styles.submit}
            name={isLoginFlow ? "Login" : "Signup"}
            type="submit"
            disabled={!enableCTA()}
          />

          <p className={styles.bottomText}>
            {isLoginFlow ? "New here ? " : "Already registered ? "}
            <span onClick={toggleFlow}>
              {isLoginFlow ? "Click here to Signup" : "Click here to login"}
            </span>
          </p>

          {!!error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </form>
    </main>
  );
};

export default OnBoard;
