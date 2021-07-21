import * as Yup from "yup";

const validate = Yup.object({
  name: Yup.string()
    .max(40, "Must be 40 characters or less.")
    .required("Required."),
  email: Yup.string()
    .email("Email is invalid.")
    .max(80, "Must be 80 characters or less")
    .required("Required."),
  password: Yup.string()
    .max(40, "Must be 40 characters or less")
    .required("Required"),
});

export default validate;
