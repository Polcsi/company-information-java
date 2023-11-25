import { CompanyData } from "../pages/Companies";
import CompanyRow from "./CompanyRow";

const CompanyList = ({ companies }: { companies?: CompanyData[] }) => {
  return (
    <>
      <section className="company-list on-scroll">
        {companies?.map((company: CompanyData) => (
          <CompanyRow key={company.companyID} {...company} />
        ))}
      </section>
    </>
  );
};

export default CompanyList;
