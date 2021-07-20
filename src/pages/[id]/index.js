import styles from "../../styles/Home.module.css";

function index({ post }) {
  return (
    <div className={styles.postDetail}>
      <h3>{post.data.title}</h3>
      <p>{post.data.description}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:3000/api/posts/${context.query.id}`
  );
  const post = await res.json();

  return {
    props: { post },
  };
}

export default index;
