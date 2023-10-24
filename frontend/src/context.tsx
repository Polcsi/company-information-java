/* 
  Context for variables and functions for multi access.
*/

import axios from "axios";
import {
  useState,
  useContext,
  useRef,
  ReactElement,
  createContext,
  FormEvent,
} from "react";
import { toast } from "react-toastify";

type ProviderParams = {
  children?: ReactElement[] | ReactElement | undefined;
};

interface CompanyType {
  name: string;
  email: string;
  description?: string;
}

interface EmployeeType {
  name: string;
  age: number;
  email: string;
  job: string;
  cv?: string;
}

export interface DataType {
  company: CompanyType[];
  employees: EmployeeType[];
}

type GlobalContextType = {};

// Defining the custom Hook 'useGlobalAppContext':
const useGlobalAppContext = ({}: GlobalContextType) => {
  // State variables
  const [numberOfEmployees, setNumberOfEmployees] = useState<number>(0);
  const [dataJSON, setDataJSON] = useState<string>("");
  const companyNameRef = useRef<HTMLInputElement>(null);
  const companyEmailRef = useRef<HTMLInputElement>(null);
  const companyDescriptionRef = useRef<HTMLTextAreaElement>(null);

  function styleRequiredInput(e: FormEvent<HTMLInputElement>): void {
    // Function for add a red border to empty input
    if ((e.target as HTMLInputElement).value) {
      (e.target as HTMLInputElement).classList.remove("required-input");
    } else {
      (e.target as HTMLInputElement).classList.add("required-input");
    }
  }

  function invalidEmail(e: FormEvent<HTMLInputElement>): void {
    // add red border to invalid email
    (e.target as HTMLInputElement).classList.add("required-input");
  }

  const validataEmailAddress = (str: string): boolean => {
    // Validate email string with regex pattern
    const pattern = new RegExp(
      "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+"
    );
    if (pattern.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  function toastError(message: string): void {
    // pop-up error message
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function toastSuccess(message: string): void {
    // pop-up success message
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function addRequiredInputStyle(element: HTMLElement | null): void {
    // add required-input class to the element parameter
    element!.classList.add("required-input");
  }

  async function validateEmployeeForms(
    employeeForms: NodeListOf<HTMLFormElement>
  ): Promise<boolean | EmployeeType[]> {
    /* 
      Function for validate all of the rendered employee forms. Returns false if 
    */
    let employeeData: EmployeeType[] = [];

    /* Loop through all employee forms */
    employeeForms.forEach((eForm) => {
      let errors: string[] = [];
      let employeeObject: EmployeeType = {} as EmployeeType;

      /* loop through the inputs and validate their values  */
      eForm.childNodes.forEach((inputs) => {
        switch ((inputs as HTMLInputElement).type) {
          case "text": // name field
            if (!(inputs as HTMLInputElement).value) {
              /* if the name field is empty then style the input field and add a new error to the errors array */
              errors = [...errors, "Missing name"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else {
              /* if the name field is not empty then add a new property to the employee object */
              employeeObject = {
                ...employeeObject,
                name: (inputs as HTMLInputElement).value,
              };
            }
            break;
          case "number": // age field
            if (!(inputs as HTMLInputElement).value) {
              errors = [...errors, "Missing age"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else if (parseInt((inputs as HTMLInputElement).value) < 18) {
              /* if the age is less than 18 throw an error message */
              errors = [...errors, "Provide age above 17"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else {
              employeeObject = {
                ...employeeObject,
                age: parseInt((inputs as HTMLInputElement).value),
              };
            }
            break;
          case "email": // email field
            if (!(inputs as HTMLInputElement).value) {
              errors = [...errors, "Missing email"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else if (
              !validataEmailAddress((inputs as HTMLInputElement).value)
            ) {
              /* Validate email address with regular expression */
              errors = [...errors, "Provide valid email address"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else {
              employeeObject = {
                ...employeeObject,
                email: (inputs as HTMLInputElement).value,
              };
            }
            break;
          case "select-one": // job select field
            if ((inputs as HTMLInputElement).value === "0") {
              /* If the selected value is 0 then the user did not select job so create an error */
              errors = [...errors, "Missing job"];
              addRequiredInputStyle(inputs as HTMLInputElement);
            } else {
              employeeObject = {
                ...employeeObject,
                job: (inputs as HTMLInputElement).value,
              };
            }
            break;
          case undefined: // cv file input field
            let pdf = (inputs.childNodes[1] as HTMLInputElement).value;
            employeeObject = { ...employeeObject, cv: pdf };
            break;

          default:
            break;
        }
      });

      if (errors.length === 4) {
        /* If missing all of the inputs then throw a short message */
        toastError(
          `Please fill the required fields in #${eForm.name} Employee Form!`
        );
      } else if (errors.length > 0) {
        /* Output all of the error message */
        errors.forEach((error) => {
          toastError(`#${eForm.name} Employee: ${error}`);
        });
      } else {
        /* If there is no any error then add a new employee object to the all employees */
        employeeData = [...employeeData, employeeObject];
      }
    });
    if (employeeData.length === numberOfEmployees) {
      /* If the 'employeeData' length match with the 'numberOfEmployees' then return all employees else return false */
      /* 'numberOfEmployees' means the setted value on the slider */
      return employeeData;
    } else {
      return false;
    }
  }

  async function validateCompanyForm(): Promise<boolean | CompanyType[]> {
    /* 
      Function to validate company form
    */

    let errors: any[] = [];
    if (!companyNameRef?.current!.value) {
      /* if name field is empty then add red border to the field and send a pop-up message about the error */
      addRequiredInputStyle(companyNameRef.current);
      toastError("Company Form: Missing Name");
      errors = [...errors, 1];
    }
    if (!validataEmailAddress(companyEmailRef?.current!.value)) {
      /* if email field is empty then add red border to the field and send a pop-up message about the error */
      addRequiredInputStyle(companyEmailRef.current);
      toastError("Company Form: Invalid Email Address");
      errors = [...errors, 1];
    }
    if (errors.length > 0) {
      /* return false when the errors array length is zero that means the required fields are not empty */
      return false;
    }
    /* return an object which includes name, email and description */
    return [
      {
        name: companyNameRef?.current!.value,
        email: companyEmailRef?.current!.value,
        description: companyDescriptionRef?.current!.value,
      },
    ];
  }

  async function submitForms(): Promise<boolean> {
    /* 
      This functions calls when the user clicks on the submit button
    */
    const employeeForms: NodeListOf<HTMLFormElement> =
      document.querySelectorAll(".employee-form");

    const companyFormData = await validateCompanyForm(); // false if company form is not valid. If valid then returns an object of data
    const employeeFormsData = await validateEmployeeForms(employeeForms); // false if one of the employee form is not valid. If valid then returns an object of data

    if (companyFormData !== false && employeeFormsData !== false) {
      /* if the company form and the employees form is not false then convert the json data to string */
      setDataJSON(
        JSON.stringify([
          { company: companyFormData, employees: employeeFormsData },
        ])
      );
      console.log([{ company: companyFormData, employees: employeeFormsData }]);
      try {
        // send the data to the backend
        await axios.post("http://127.0.0.1:8000/company/add_employees", {
          name: (companyFormData as any)[0].name,
          email: (companyFormData as any)[0].email,
          description: (companyFormData as any)[0].description,
          employees: employeeFormsData,
        });
      } catch (error) {
        console.error(error);
        toastError("Something went wrong!");
      }

      toastSuccess("Forms have been sent successfully");
      return true;
    }
    return false;
  }

  return {
    numberOfEmployees,
    setNumberOfEmployees,
    styleRequiredInput,
    invalidEmail,
    submitForms,
    companyNameRef,
    companyEmailRef,
    companyDescriptionRef,
    dataJSON,
    toastError,
    toastSuccess,
  };
};

type UseGlobalAppContextType = ReturnType<typeof useGlobalAppContext>;

// Default values for the state variables
const initContextState: UseGlobalAppContextType = {
  numberOfEmployees: 0,
  setNumberOfEmployees: () => {},
  styleRequiredInput: () => {},
  invalidEmail: () => {},
  submitForms: () => {
    return new Promise(() => {});
  },
  companyNameRef: { current: null },
  companyEmailRef: { current: null },
  companyDescriptionRef: { current: null },
  dataJSON: "",
  toastError: () => {},
  toastSuccess: () => {},
};

// Creating the GlobalContext:
const GlobalContext = createContext<UseGlobalAppContextType>(initContextState);

// Creating the GlobalContextProvider
const GlobalContextProvider = ({
  children,
}: ProviderParams & GlobalContextType): ReactElement => {
  return (
    <GlobalContext.Provider value={useGlobalAppContext({})}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
