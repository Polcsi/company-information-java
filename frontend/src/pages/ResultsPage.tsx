/* 
  Results page for "/results" route.
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataType, useGlobalContext } from "../context";
/* Import Icons */
import { FaUser, FaHashtag } from "react-icons/fa";
import { MdOutlineEmail, MdDescription } from "react-icons/md";
/* Import components */
import TopScrollButton from "../components/buttons/TopScrollButton";
import HomeButton from "../components/buttons/HomeButton";
import Background from "../layout/Background";

const ResultsPage = () => {
  const { dataJSON } = useGlobalContext();
  const [data, setData] = useState<DataType[]>([
    { company: [{ name: "", email: "", description: "" }], employees: [] },
  ]);
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    /* Navigates back to the home page if the dataJSON variable is empty. dataJSON variable stores the submitted json string from the entered values in the forms */
    if (!dataJSON) {
      navigate("/", { replace: false });
    }
  });

  useEffect(() => {
    /* Convert the json string to an object */
    setData((prev) => (prev = JSON.parse(dataJSON)));
  }, [setData, dataJSON]);

  return (
    <>
      <HomeButton />
      <Background className="results-page">
        <section className="company-card results-section">
          <h1>company information</h1>
          <div className="company-details">
            <div className="c-data-section">
              <h2>
                <FaHashtag />
                name:
              </h2>
              <span>{data[0].company[0].name}</span>
            </div>
            <div className="c-data-section">
              <h2>
                <MdOutlineEmail />
                email:
              </h2>
              <span>{data[0].company[0].email}</span>
            </div>
            <div className="c-data-section">
              <h2>
                <MdDescription />
                description:
              </h2>
              <span>{data[0].company[0].description}</span>
            </div>
          </div>
        </section>
        <section className="employee-results-section results-section">
          <h1>employees</h1>
          <div
            className="employee-cards"
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              /* Show scrollbar on mouse enter */
              (e.target as HTMLDivElement).classList.add("on-scroll");
            }}
            onMouseLeave={(e) => {
              /* hide scrollbar on mouse leave */
              (e.target as HTMLDivElement).classList.remove("on-scroll");
            }}
          >
            {/* Iterate over the employees and shows on the page */}
            {data[0].employees.map((employee, index) => {
              return (
                <article key={index}>
                  <div className="top-design"></div>
                  <div className="usr-image">
                    <FaUser />
                  </div>
                  <div className="row-section">
                    <h2>Name:</h2>
                    <span>{employee.name}</span>
                  </div>
                  <div className="row-section">
                    <h2>Email:</h2>
                    <span>{employee.email}</span>
                  </div>
                  <div className="row-section">
                    <h2>Age:</h2>
                    <span>{employee.age}</span>
                  </div>
                  <div className="row-section">
                    <h2>Job:</h2>
                    <span>{employee.job}</span>
                  </div>
                  <div className="row-section">
                    <h2>cv:</h2>
                    <span>{employee.cv}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </Background>
      <TopScrollButton />
    </>
  );
};

export default ResultsPage;
