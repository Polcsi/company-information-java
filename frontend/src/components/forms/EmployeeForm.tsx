import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../../context";
import { jobTitles } from "../../data";
import axios from "axios";
import { CompanyData, EmployeeData } from "../../pages/Companies";
import { BASE_URL } from "../../globals";

interface EmployeeFormProps extends Omit<EmployeeData, "age" | "id"> {
  companyId: string;
  age: string | number;
}

const EmployeeForm = ({ companies }: { companies?: CompanyData[] }) => {
  const { toastSuccess, toastError } = useGlobalContext();

  return (
    <Formik<EmployeeFormProps>
      onSubmit={async (values, helpers) => {
        console.log(values);
        try {
          await axios.post(`${BASE_URL}/api/v1/employee`, values);

          helpers.resetForm();

          toastSuccess("Employee created successfully");
        } catch (error: any) {
          if (error.response.data.errors.email) {
            toastError(error.response.data.errors.email);
          } else {
            toastError("Something went wrong");
          }
        }
      }}
      validateOnChange={true}
      initialValues={{
        name: "",
        email: "",
        age: "",
        jobTitle: "",
        companyId: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Required"),
        age: Yup.number().min(18, "Minimum 18 years").required("Required"),
        email: Yup.string().email().required("Required"),
        companyId: Yup.string().required("Required"),
        jobTitle: Yup.string().required("Required"),
      })}
    >
      {({ errors, touched }) => {
        return (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <Field
              name="companyId"
              as="select"
              className={`select ${
                errors.companyId && touched.companyId ? "required-input" : ""
              }`}
            >
              {/* default option */}
              <option value="null" hidden>
                Select company
              </option>
              {companies
                ? companies?.map((company: CompanyData) => {
                    return (
                      <option key={company.companyId} value={company.companyId}>
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
                name="jobTitle"
                className={`select ${
                  errors.jobTitle && touched.jobTitle ? "required-input" : ""
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
        );
      }}
    </Formik>
  );
};

export default EmployeeForm;
