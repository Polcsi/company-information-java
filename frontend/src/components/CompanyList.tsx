import { CompanyData } from "../pages/Companies";
import CompanyRow from "./CompanyRow";

const CompanyList = ({ companies }: { companies?: CompanyData[] }) => {
  return (
    <>
      <section className="company-list on-scroll">
        {companies?.map((company: CompanyData) => (
          <CompanyRow
            key={company.companyID}
            companyID={company.companyID}
            email={company.email}
            name={company.name}
          />
        ))}
      </section>
    </>
  );
};

export default CompanyList;
