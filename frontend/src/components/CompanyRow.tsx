import React from "react";
import { GoOrganization } from "react-icons/go";
import { BsPersonLinesFill } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import { CompanyData } from "../pages/Companies";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface FullCompanyData {
  companyID: number;
  description: string;
  email: string;
  name: string;
  employees: {
    employeeID: number;
    name: string;
    email: string;
    age: number;
    job: string;
  }[];
}

const CompanyRow = ({
  companyID,
  name,
  email,
}: Omit<CompanyData, "description">) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });

  const { data } = useSWR<FullCompanyData[], AxiosError>(
    `http://127.0.0.1:8000/company/${companyID}/employees`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      refreshWhenOffline: true,
      refreshWhenHidden: false,
      revalidateOnMount: true,
      onError(error) {
        console.log(`%c ${error}`, "color: red");
      },
    }
  );

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await setTimeout(async () => {
        await axios.delete(`http://127.0.0.1:8000/company/${companyID}`);
      }, 1000);
    } catch (error) {
      setIsDeleting(false);
      toast.error("Error deleting company");
      console.error(error);
    }
  };

  const handleClick = () => {
    if (!isDeleting) navigate(`/companies/${companyID}`);
  };

  return (
    <article
      className="company-row"
      id={`${companyID}-company`}
      onClick={handleClick}
      aria-disabled={isDeleting}
      style={{
        opacity: isDeleting ? 0.5 : 1,
        cursor: isDeleting ? "not-allowed" : "pointer",
      }}
    >
      <div className="company-row-logo">
        <GoOrganization />
      </div>
      <span className="company-row-name">{name} </span>
      <div className="company-row-email">
        <span>{email}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          style={{
            color: "red",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            verticalAlign: "middle",
            display: "flex",
            alignItems: "center",
            cursor: isDeleting ? "not-allowed" : "pointer",
          }}
          className="delete-company-button"
          disabled={isDeleting}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <BiTrash />
        </button>
      </div>
      <div
        className="number-of-employees"
        data-tooltip-id="employees-tooltip"
        data-tooltip-html={`${
          data
            ? data[0]?.employees
                .map((employee) => {
                  return `${employee.name}`;
                })
                .join("<br />")
            : ""
        }`}
      >
        <BsPersonLinesFill />
        <span>{data ? data[0]?.employees.length : 0}</span>
      </div>
    </article>
  );
};

export default CompanyRow;
