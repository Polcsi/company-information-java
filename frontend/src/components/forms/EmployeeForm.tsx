import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../../context";
import { jobTitles } from "../../data";
import axios from "axios";
import { CompanyData } from "../../pages/Companies";
import { BASE_URL } from "../../globals";

const EmployeeForm = ({ companies }: { companies?: CompanyData[] }) => {
  const { toastSuccess, toastError } = useGlobalContext();

  return (
    <Formik
      onSubmit={async (values, helpers) => {
        console.log(values);
        try {
          await axios.post(`${BASE_URL}/employee/`, values);

          helpers.resetForm();

          toastSuccess("Employee created successfully");
        } catch (error) {
          console.error(error);
          toastError("Something went wrong");
        }
      }}
      validateOnChange={true}
      initialValues={{
        name: "",
        email: "",
        age: 18,
        job: "",
        cv: "",
        companyID: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        age: Yup.number().min(18, "Minimum 18 years").required("Required"),
        email: Yup.string().email().required("Required"),
        companyID: Yup.number().required("Required"),
        job: Yup.string().required("Required"),
      })}
    >
      {({ errors, touched }) => (
        <Form
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          <Field
            name="companyID"
            as="select"
            className={`select ${
              errors.companyID && touched.companyID ? "required-input" : ""
            }`}
          >
            {/* default option */}
            <option value="null" hidden>
              Select company
            </option>
            {companies
              ? companies?.map((company: CompanyData) => {
                  return (
                    <option key={company.companyID} value={company.companyID}>
                      {company.name}
                    </option>
                  );
                })
              : null}
          </Field>
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
              placeholder="Age"
              style={{ width: "calc(100% / 2)" }}
              className={`input ${
                errors.age && touched.age ? "required-input" : ""
              }`}
              name="age"
              id="age"
              type="number"
            />
          </div>
          <div style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
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
            <Field
              name="job"
              className={`select ${
                errors.job && touched.job ? "required-input" : ""
              }`}
              as="select"
              style={{ width: "calc(100% / 2)" }}
            >
              {/* default option */}
              <option value="null" hidden>
                Select job
              </option>
              {jobTitles.map((job, index) => {
                return (
                  <option key={index} value={job}>
                    {job}
                  </option>
                );
              })}
            </Field>
          </div>
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

export default EmployeeForm;
