import Link from "next/link";
import styles from "../../styles/.menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/books">
        <a>
          <div className={styles.menuItem}>Books</div>
        </a>
      </Link>
      <Link href="/mypage">
        <a>
          <div className={styles.menuItem}>MyPage</div>
        </a>
      </Link>
      <Link href="/admin">
        <a>
          <div className={styles.menuItem}>Admin</div>
        </a>
      </Link>
    </div>
  );
};

export default Menu;
