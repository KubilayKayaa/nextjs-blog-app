import { Formik, Form } from "formik";
import TextField from "./TextField";
import styles from "./createpost.module.css";
import validate from "./validate";
import { useRouter } from "next/dist/client/router";

function CreatePost({ url }) {
  const router = useRouter();
  const createPost = async (values) => {
    try {
      const res = await fetch(`https://nextjs-post-app.vercel.app/api/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        createPost(values);
      }}
    >
      {(formik) => (
        <div className={styles.createPostContainer}>
          <h1 className="my-4 font-weight-bold-display-4 titleText">
            Create Post
          </h1>
          <div className={styles.underline}></div>
          <Form>
            <TextField label="Title" name="title" type="text" />
            <TextField label="Description" name="description" type="text" />
            <button className="btn btn-dark mt-3 shadow-none" type="submit">
              Create
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreatePost;
