import { Formik, Form } from "formik";
import TextField from "../../components/CreatePost/TextField";
import styles from "../../components/CreatePost/createpost.module.css";
import validate from "../../components/CreatePost/validate";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

function edit({ post, url }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const updatePost = async (values) => {
    await fetch(
      `https://nextjs-post-app.vercel.app/api/posts/${post.data._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    router.push("/");
  };

  return (
    <Formik
      initialValues={{
        title: post.data.title,
        description: post.data.description,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        updatePost(values);
      }}
    >
      {(formik) => (
        <div className={styles.createPostContainer}>
          <Head>
            <title>{post.data.title}</title>
          </Head>
          <h1 className="my-4 font-weight-bold-display-4 titleText">
            Update Post
          </h1>
          <div className={styles.underline}></div>
          <Form>
            <TextField label="Title" name="title" type="text" />
            <TextField label="Description" name="description" type="text" />
            <button className="btn btn-dark mt-3 shadow-none" type="submit">
              Update
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://nextjs-post-app.vercel.app/api/posts/${context.query.id}`
  );
  const post = await res.json();

  return {
    props: { post, url: context.req.headers.host },
  };
}

export default edit;
