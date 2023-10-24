/* 
  Component for company section.
*/

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
/* import custom slider */
import CustomSlider from "../inputs/CustomSlider";
import "../../style/customSlider.css";
import { FormEvent } from "react";

const CompanyDataForm = () => {
  const {
    styleRequiredInput,
    invalidEmail,
    submitForms,
    companyNameRef,
    companyEmailRef,
    companyDescriptionRef,
  } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div className="title">
          <span id="welcome">Company Information</span>
          <span id="content">Please fill the fields</span>
        </div>
        <input
          required
          placeholder="Name"
          className="input"
          id="name"
          type="text"
          ref={companyNameRef}
          onInput={(e: FormEvent<HTMLInputElement>) => styleRequiredInput(e)} // style if input field is not empty
        ></input>
        <input
          required
          placeholder="Email"
          className="input"
          id="email"
          type="email"
          ref={companyEmailRef}
          onInput={(e: FormEvent<HTMLInputElement>) => styleRequiredInput(e)} // style if input field is not empty
          onInvalid={(e: FormEvent<HTMLInputElement>) => invalidEmail(e)} // validate email
        ></input>
        <CustomSlider min={1} value={1} max={100} />
        {/* Custom slider component */}
        <textarea
          id="description"
          placeholder="Description"
          className="input"
          ref={companyDescriptionRef}
        ></textarea>
      </form>
      <button
        className="submitbtn"
        type="button"
        onClick={async () => {
          // Form submission
          let success = await submitForms();
          if (success) {
            // navigates to the results page if the form filled successfully
            navigate("/results", { replace: false });
          }
        }}
      >
        Submit
      </button>
    </>
  );
};

export default CompanyDataForm;
