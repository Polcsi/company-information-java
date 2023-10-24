import { Field, useFormikContext, Form } from "formik";
import { UpdateFormData } from "../../pages/SingleCompany";

const UpdateCompanyForm = () => {
  const { errors, touched } = useFormikContext<UpdateFormData>();

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div className="title" style={{ marginBottom: "20px" }}>
        <span id="welcome">Company Information</span>
        <span id="content">Please fill the fields</span>
      </div>
      <Field
        name="name"
        placeholder="Name"
        className={`input ${
          errors.name && touched.name ? "required-input" : ""
        }`}
        type="text"
      ></Field>
      <Field
        name="email"
        placeholder="Email"
        className={`input ${
          errors.email && touched.email ? "required-input" : ""
        }`}
        type="email"
      ></Field>
      <Field
        style={{ width: "100%", height: "160px" }}
        name="description"
        placeholder="Description"
        className={`input ${
          errors.description && touched.description ? "required-input" : ""
        }`}
        as="textarea"
      ></Field>
      <button type="submit" className="submitbtn" style={{ width: "100%" }}>
        Update
      </button>
    </Form>
  );
};

export default UpdateCompanyForm;
