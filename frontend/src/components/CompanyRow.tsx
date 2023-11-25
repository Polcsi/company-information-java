import React from "react";
import { GoOrganization } from "react-icons/go";
import { BsPersonLinesFill } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { CompanyData } from "../pages/Companies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../globals";

const CompanyRow = ({
  companyId,
  name,
  email,
  employeeIds,
}: Omit<CompanyData, "description">) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await setTimeout(async () => {
        await axios.delete(`${BASE_URL}/api/v1/company/${companyId}`);
      }, 1000);
    } catch (error) {
      setIsDeleting(false);
      toast.error("Error deleting company");
      console.error(error);
    }
  };

  const handleClick = () => {
    if (!isDeleting) navigate(`/companies/${companyId}`);
  };

  return (
    <article
      className="company-row"
      id={`${companyId}-company`}
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
          employeeIds
            ? employeeIds
                ?.map((employee) => {
                  return `${employee.name}`;
                })
                .join("<br />")
            : ""
        }`}
      >
        <BsPersonLinesFill />
        <span>{employeeIds ? employeeIds?.length : 0}</span>
      </div>
    </article>
  );
};

export default CompanyRow;
