/* 
  Page for "/create-company" route.
*/

import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
/* Import components */
import CompanyDataForm from "../components/forms/CompanyDataForm";
import EmployeeDataForm from "../components/forms/EmployeeDataForm";
import TopScrollButton from "../components/buttons/TopScrollButton";
import Background from "../layout/Background";
import HomeButton from "../components/buttons/HomeButton";

const CreateCompanyWithEmployees = () => {
  const { numberOfEmployees } = useGlobalContext();
  const [numberOfForms, setNumberOfForms] = useState<number[]>([]);

  useEffect(() => {
    /* Renders the number of employee forms based on how many employees setted on the slider */
    setNumberOfForms([]);
    for (let i = 0; i < numberOfEmployees; ++i) {
      /* Append the 'i' value to the 'numberOfForms' array */
      setNumberOfForms((prevForms) => [...prevForms, i]);
    }

    return () => {};
  }, [numberOfEmployees]); // if the numberOfEmployees state variable change then re-render this component
  return (
    <>
      <TopScrollButton />
      <HomeButton />
      <Background>
        <section className="company-section section">
          <CompanyDataForm />
        </section>
        <section className="employee-section">
          <div
            className="employee-list"
            onScroll={(e) => {
              /* if the user scrolls the scrollbar become visible */
              if (
                (e.target as HTMLElement).classList.contains("on-scroll") ===
                false
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
            {/* If number of employees is zero then show a message but if it is not zero then render employee forms */}
            {numberOfEmployees === 0 ? (
              <h4 className="zero-employee">Number of Employees is zero!</h4>
            ) : (
              numberOfForms.map((employeeForm, index) => {
                return (
                  <EmployeeDataForm key={index} number={employeeForm + 1} />
                );
              })
            )}
          </div>
        </section>
      </Background>
    </>
  );
};

export default CreateCompanyWithEmployees;
