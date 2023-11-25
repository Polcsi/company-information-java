/* 
  Component for employee section. This compnent renders a single employee form.
*/
import { FormEvent } from "react";
import { useGlobalContext } from "../../context";
// import custom select component
import CustomSelect from "../inputs/CustomSelect";

interface EmployeeDataFormProps {
  number: number;
}

const EmployeeDataForm = ({ number }: EmployeeDataFormProps) => {
  const { styleRequiredInput, invalidEmail } = useGlobalContext();

  return (
    <div
      className="section single-employee"
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
    >
      <h1>#{number} Employee</h1>
      <form
        className="employee-form"
        name={number.toString()}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
          <input
            style={{ width: "100%" }}
            autoComplete="on"
            className="employeeName input"
            type="text"
            placeholder="Name"
            required
            onInput={(e: FormEvent<HTMLInputElement>) => styleRequiredInput(e)} // style input field
          />
          <input
            style={{ width: "calc(100% / 3)" }}
            className="employeeAge input"
            min={18}
            type="number"
            placeholder="Age"
            required
            onInput={(e: FormEvent<HTMLInputElement>) => styleRequiredInput(e)} // style input field
          />
        </div>
        <div style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
          <input
            style={{ width: "calc(100% / 2)" }}
            autoComplete="on"
            className="employeeEmail input"
            type="email"
            placeholder="Email"
            required
            onInput={(e: FormEvent<HTMLInputElement>) => styleRequiredInput(e)} // style input field
            onInvalid={(e: FormEvent<HTMLInputElement>) => invalidEmail(e)} // validate email and style input field
          />
          <div style={{ width: "calc(100% / 2)" }}>
            <CustomSelect />
          </div>
        </div>
        {/* <div className="employeeCVFile">
          <label>Select CV:</label>
          <input type="file" accept=".pdf" />
        </div> */}
      </form>
    </div>
  );
};

export default EmployeeDataForm;
