import React from "react";

import Menu from "../components/menu/menu";
import { parseCookies } from "nookies";
import Router from "next/router";

export default function Home() {
  const cookies = parseCookies();

  if (typeof window !== "undefined") {
    if (
      cookies.userID === undefined ||
      cookies.userID === null ||
      cookies.userID === "undefined"
    ) {
      Router.push("/mypage/auth");
    }
  }
  return (
    <div>
      <main>
        <Menu />
      </main>
    </div>
  );
}
