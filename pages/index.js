import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../http-config";

function Home({ posts }) {
  const [search, setSearch] = useState("");
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();
  const deletePost = async (id) => {
    try {
      const deleted = await fetch(`${http}/api/posts/${id}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsAuth(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <>
        <div className={styles.header}>
          <h1>Posts</h1>
          <div className={styles.underline}></div>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.posts}>
          {posts.data &&
            posts.data
              .filter((post) => {
                if (search === "") {
                  return post;
                } else if (
                  post.title.toUpperCase().includes(search.toUpperCase()) ||
                  post.description.toUpperCase().includes(search.toUpperCase())
                ) {
                  return post;
                }
              })
              .map((post) => (
                <div key={post._id} className={styles.post}>
                  <Link href={`/${post._id}`}>
                    <a className={styles.postTitle}>{post.title}</a>
                  </Link>
                  <p>{post.description}</p>
                  {isAuth && isAuth.user.email == post.userName ? (
                    <div className={styles.icons}>
                      <AiFillDelete
                        size="18"
                        className={styles.icon}
                        onClick={() => deletePost(post._id)}
                      />
                      <FiEdit2
                        size="18"
                        className={styles.icon}
                        onClick={() => router.push(`/${post._id}/edit`)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.profile}>
                    <div></div>
                    <p className={styles.profileUser}>{post.userName}</p>
                  </div>
                </div>
              ))}
        </div>
      </>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${http}/api/posts`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}

export default Home;
