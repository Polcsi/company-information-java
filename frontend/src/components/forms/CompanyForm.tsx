import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { BASE_URL } from "../../globals";

const CompanyForm = () => {
  const { toastSuccess, toastError } = useGlobalContext();

  return (
    <Formik
      onSubmit={async (
        values,
        helpers: FormikHelpers<{
          name: string;
          email: string;
          description: string;
        }>
      ) => {
        try {
          await axios.post(`${BASE_URL}/company/`, values);
          helpers.resetForm();
          toastSuccess("Company created successfully");
        } catch (error) {
          console.error(error);
          toastError("Something went wrong");
        }
      }}
      validateOnChange={true}
      initialValues={{ name: "", email: "", description: "" }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        description: Yup.string()
          .min(3, "Minimum 3 characters")
          .max(100, "Maximum 100 characters"),
      })}
    >
      {({ errors, touched }) => (
        <Form
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          <div style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
            <Field
              placeholder="Name"
              style={{ width: "calc(100% / 2)" }}
              className={`input ${
                errors.name && touched.name ? "required-input" : ""
              }`}
              name="name"
              id="name"
              type="text"
            />
            <Field
              placeholder="Email"
              style={{ width: "calc(100% / 2)" }}
              className={`input ${
                errors.email && touched.email ? "required-input" : ""
              }`}
              name="email"
              id="email"
              type="email"
            />
          </div>
          <Field
            id="description"
            placeholder="Description"
            name="description"
            className={`input ${
              errors.description && touched.description ? "required-input" : ""
            }`}
            rows="3"
            as="textarea"
          />
          <button
            className="submitbtn"
            style={{ marginTop: "0.5rem" }}
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
