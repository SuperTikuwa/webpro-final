import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import React from "react";
import styles from "../../styles/.auth.module.scss";

const Register = () => {
  const name = React.useRef(null);

  const cookies = parseCookies();

  if (typeof window !== "undefined") {
    if (
      cookies.userID !== undefined &&
      cookies.userID !== null &&
      cookies.userID !== "undefined"
    ) {
      Router.push("/");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = name.current.value;
    const response = await fetch(
      process.env.API_ORIGIN + "/users?name=" + user,
      {
        method: "POST",
      }
    );

    if (response.status === 201) {
      const json = await response.json();
      console.log(json);
      setCookie(null, "userID", json.id, {
        maxAge: 60 * 60 * 24 * 365 * 1000,
        path: "/",
      });
      Router.push("/");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input type="text" placeholder="username" ref={name} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Register;
