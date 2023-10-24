import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { FullCompanyData } from "../components/CompanyRow";
import Background from "../layout/Background";
import TopScrollButton from "../components/buttons/TopScrollButton";
import HomeButton from "../components/buttons/HomeButton";
import { Formik } from "formik";
import { jobTitles } from "../data";
import { useGlobalContext } from "../context";
import * as Yup from "yup";
import UpdateEmployeeForm from "../components/forms/UpdateEmployeeForm";
import UpdateCompanyForm from "../components/forms/UpdateCompanyForm";

export interface UpdateFormData {
  name: string;
  email: string;
  description?: string;
  employees: EmployeeForm[];
}

interface EmployeeForm {
  name: string;
  email: string;
  age: number;
  job: string;
}

const SingleCompany = () => {
  const { toastSuccess } = useGlobalContext();
  const navigate = useNavigate();
  // get id from url
  const { id } = useParams();
  // fetch company data
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });

  const { data, isLoading } = useSWR<FullCompanyData[], AxiosError>(
    `http://127.0.0.1:8000/company/${id}/employees`,
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
      await axios.put(`http://127.0.0.1:8000/company/${id}/employees`, values);

      toastSuccess("Company updated successfully!");
      navigate(`/companies`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TopScrollButton />
      <HomeButton to={"/companies"} />
      <Background>
        {isLoading ? null : (
          <Formik<UpdateFormData>
            initialValues={{
              name: data![0].name,
              email: data![0].email,
              description: data![0].description,
              employees: data![0].employees,
            }}
            validateOnChange={true}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required!"),
              email: Yup.string()
                .email("Invalid email!")
                .required("Email is required!"),
              employees: Yup.array().of(
                Yup.object().shape({
                  name: Yup.string().required("Name is required!"),
                  email: Yup.string()
                    .email("Invalid email!")
                    .required("Email is required!"),
                  age: Yup.number()
                    .typeError("Age must be a number!")
                    .min(18, "Age must be greater than 18!")
                    .required("Age is required!"),
                  job: Yup.string()
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
