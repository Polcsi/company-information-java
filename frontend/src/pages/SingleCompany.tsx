import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Background from "../layout/Background";
import TopScrollButton from "../components/buttons/TopScrollButton";
import HomeButton from "../components/buttons/HomeButton";
import { Formik } from "formik";
import { jobTitles } from "../data";
import { useGlobalContext } from "../context";
import * as Yup from "yup";
import UpdateEmployeeForm from "../components/forms/UpdateEmployeeForm";
import UpdateCompanyForm from "../components/forms/UpdateCompanyForm";
import { APIResponse, BASE_URL } from "../globals";
import { CompanyData, EmployeeData } from "./Companies";

export interface UpdateFormData {
  name: string;
  email: string;
  description?: string;
  employeeIds: EmployeeData[];
}

const SingleCompany = () => {
  const { toastSuccess, toastError } = useGlobalContext();
  const navigate = useNavigate();
  // get id from url
  const { id } = useParams();
  // fetch company data
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });

  const { data, isLoading } = useSWR<APIResponse<CompanyData[]>, AxiosError>(
    `${BASE_URL}/api/v1/company?filter=companyId%7Ceq%7C${id}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshWhenOffline: true,
      refreshWhenHidden: false,
      revalidateOnMount: true,
      onError(error) {
        console.log(`%c ${error}`, "color: red");
      },
    }
  );

  const handleUpdate = async (values: UpdateFormData) => {
    try {
      await axios.put(`${BASE_URL}/api/v1/company/${id}`, {
        name: values.name,
        email: values.email,
        description: values.description,
      });

      // Iterate over the employees and update them
      async function updateEmployees() {
        const res = values.employeeIds.map(async (employee) => {
          if (employee.id === undefined) {
            // Create new employee
            try {
              await axios.post(`${BASE_URL}/api/v1/employee`, {
                name: employee.name,
                email: employee.email,
                age: employee.age,
                jobTitle: employee.jobTitle,
                companyId: id,
              });
              return { error: null, isError: false };
            } catch (error: any) {
              return { error: error.response.data.errors.email, isError: true };
            }
          } else {
            try {
              // Update existing employee
              await axios.put(`${BASE_URL}/api/v1/employee/${employee.id}`, {
                name: employee.name,
                email: employee.email,
                age: employee.age,
                jobTitle: employee.jobTitle,
              });
              return { error: null, isError: false };
            } catch (error: any) {
              return { error: error.response.data.errors.email, isError: true };
            }
          }
        });

        return res;
      }

      const res = await updateEmployees();
      const arr = await Promise.all(res);

      // Check if there is any error
      const hasError = arr.some((item) => item.isError === true);

      if (hasError) {
        arr.forEach((item) => {
          if (item.isError) {
            toastError(item.error);
          }
        });

        return;
      }
      toastSuccess("Company updated successfully!");
      navigate("/companies");
    } catch (error) {
      toastError("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <TopScrollButton />
      <HomeButton to={"/companies"} />
      <Background>
        {isLoading && !data ? null : (
          <Formik<UpdateFormData>
            initialValues={{
              name: data?.data[0].name!,
              email: data?.data[0].email!,
              description: data?.data[0].description!,
              employeeIds: data?.data[0].employeeIds!,
            }}
            enableReinitialize={true}
            validateOnChange={true}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required!"),
              email: Yup.string()
                .email("Invalid email!")
                .required("Email is required!"),
              employeeIds: Yup.array().of(
                Yup.object().shape({
                  name: Yup.string().required("Name is required!"),
                  email: Yup.string()
                    .email("Invalid email!")
                    .required("Email is required!"),
                  age: Yup.number()
                    .typeError("Age must be a number!")
                    .min(18, "Age must be greater than 18!")
                    .required("Age is required!"),
                  jobTitle: Yup.string()
                    .oneOf(jobTitles, "Invalid job title!")
                    .required("Job title is required!"),
                })
              ),
            })}
            onSubmit={handleUpdate}
          >
            <>
              <section
                className="section"
                style={{
                  height: "530px",
                  color: "white",
                  padding: "3rem 2rem",
                }}
              >
                <UpdateCompanyForm />
              </section>
              <section className="employee-section">
                <div
                  className="employee-list"
                  onScroll={(e) => {
                    /* if the user scrolls the scrollbar become visible */
                    if (
                      (e.target as HTMLElement).classList.contains(
                        "on-scroll"
                      ) === false
                    ) {
                      (e.target as HTMLElement).classList.add("on-scroll");
                    }
                  }}
                  onMouseEnter={(e) => {
                    /* Show scrollbar when the mouse enter in this element */
                    (e.target as HTMLElement).classList.add("on-scroll");
                  }}
                  onMouseLeave={(e) => {
                    /* Hide scrollbar when the mouse leave this element */
                    (e.target as HTMLElement).classList.remove("on-scroll");
                  }}
                >
                  <UpdateEmployeeForm />
                </div>
              </section>
            </>
          </Formik>
        )}
      </Background>
    </>
  );
};

export default SingleCompany;
