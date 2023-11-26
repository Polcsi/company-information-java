import { CompanyData } from "../pages/Companies";
import CompanyRow from "./CompanyRow";

const CompanyList = ({ companies }: { companies?: CompanyData[] }) => {
  return (
    <>
      <section className="company-list on-scroll">
        {/* // IF companies is empty then show a message but if it is not empty then render CompanyRow component */}
        {companies?.length === 0 ? (
          <h4
            style={{
              textAlign: "center",
              background: "transparent",
              fontSize: "1.1rem",
              padding: "0.5rem 0",
            }}
          >
            No company found!
          </h4>
        ) : null}
        {companies?.map((company: CompanyData) => (
          <CompanyRow key={company.companyId} {...company} />
        ))}
      </section>
    </>
  );
};

export default CompanyList;
