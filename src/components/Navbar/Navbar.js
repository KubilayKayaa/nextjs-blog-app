import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Home</a>
      </Link>
      <Link href="/createpost">
        <a>Create Post</a>
      </Link>
    </nav>
  );
}
