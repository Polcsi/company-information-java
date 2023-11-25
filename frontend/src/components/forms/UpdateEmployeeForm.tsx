import React from "react";
import { Field, FieldArray, Form, useFormikContext } from "formik";
import { UpdateFormData } from "../../pages/SingleCompany";
import { BiTrash } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { jobTitles } from "../../data";
import axios from "axios";
import { BASE_URL } from "../../globals";
import { useGlobalContext } from "../../context";

const UpdateEmployeeForm = () => {
  const { values, errors } = useFormikContext<UpdateFormData>();
  const { toastError, toastSuccess } = useGlobalContext();

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FieldArray
        name="employeeIds"
        render={(arrayHelpers) => {
          return (
            <React.Fragment>
              {values?.employeeIds?.length === 0 ? null : (
                <React.Fragment>
                  {values.employeeIds.map((_employeeForm, index: number) => {
                    return (
                      <div className="section single-employee" key={index}>
                        <h1>#{index + 1} Employee</h1>
                        <button
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            color: "red",
                            background: "var(--glassmorphic)",
                            border: "none",
                            fontSize: "1.2rem",
                            verticalAlign: "middle",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0.3rem",
                            cursor: "pointer",
                            borderRadius: "100%",
                          }}
                          type="button"
                          onClick={async () => {
                            try {
                              // Remove the employee from database
                              if (values.employeeIds[index].id) {
                                await axios.delete(
                                  `${BASE_URL}/api/v1/employee/${values.employeeIds[index].id}`
                                );
                                toastSuccess("Employee deleted successfully");
                              }

                              arrayHelpers.remove(index);
                            } catch (error) {
                              toastError("Something went wrong");
                              console.error(error);
                            }
                          }}
                        >
                          <BiTrash />
                        </button>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Field
                              name={`employeeIds.${index}.name`}
                              autoComplete="on"
                              className={`${
                                typeof errors.employeeIds === "string"
                                  ? ""
                                  : (errors.employeeIds?.[index] as any)?.name
                                  ? "required-input"
                                  : ""
                              } employeeName input`}
                              style={{ width: "calc(100% / 1)" }}
                              type="text"
                              placeholder="Name"
                              required
                            />
                            <Field
                              name={`employeeIds.${index}.age`}
                              className={`${
                                (errors.employeeIds?.[index] as any)?.age
                                  ? "required-input"
                                  : ""
                              } employeeAge input`}
                              style={{ width: "calc(100% / 3)" }}
                              min={18}
                              type="number"
                              placeholder="Age"
                              required
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                            }}
                          >
                            <Field
                              name={`employeeIds.${index}.email`}
                              autoComplete="on"
                              className={`employeeEmail input ${
                                typeof errors.employeeIds === "string"
                                  ? ""
                                  : (errors.employeeIds?.[index] as any)?.email
                                  ? "required-input"
                                  : ""
                              }`}
                              type="email"
                              placeholder="Email"
                              style={{ width: "calc(100% / 2)" }}
                              required
                            />
                            <Field
                              name={`employeeIds.${index}.jobTitle`}
                              className={`select ${
                                (errors.employeeIds?.[index] as any)?.job
                                  ? "required-input"
                                  : ""
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
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              )}
              <div
                className="section"
                onClick={() =>
                  arrayHelpers.push({
                    name: "",
                    email: "",
                    age: 18,
                    jobTitle: "",
                  })
                }
                style={{
                  cursor: "pointer",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "98%",
                    height: "95%",
                    borderRadius: "20px",
                    background: "transparent",
                    border: "2px solid white",
                  }}
                ></div>
                <BsPlusSquare
                  style={{
                    height: "150px",
                    fontSize: "3rem",
                  }}
                />
              </div>
            </React.Fragment>
          );
        }}
      />
    </Form>
  );
};

export default UpdateEmployeeForm;
