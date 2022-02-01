import React from "react";
import Router from "next/router";
import { setCookie } from "nookies";

const Auth = () => {
  const pass = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = pass.current.value;
    const response = await fetch(process.env.API_ORIGIN + "/users/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });

    if (response.status === 200) {
      setCookie(null, "admin", true, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      Router.push("/admin");
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="password" ref={pass} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Auth;
