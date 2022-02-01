import Link from "next/link";
import styles from "../../styles/.menu.module.scss";
import { parseCookies } from "nookies";
import Router from "next/router";

const Admin = (props) => {
  const cookies = parseCookies();

  if (typeof window !== "undefined") {
    if (!cookies.admin) {
      Router.push("/admin/auth");
    }
  }

  return (
    <div className={styles.menu}>
      <Link href="/books/add">
        <a>
          <div className={styles.menuItem}>本の登録</div>
        </a>
      </Link>
      <Link href="/books/delete">
        <a>
          <div className={styles.menuItem}>本の削除</div>
        </a>
      </Link>
    </div>
  );
};

export default Admin;
