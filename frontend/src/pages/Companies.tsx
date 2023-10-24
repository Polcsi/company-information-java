import Background from "../layout/Background";
import HomeButton from "../components/buttons/HomeButton";
import CompanyList from "../components/CompanyList";
import CompanyForm from "../components/forms/CompanyForm";
import EmployeeForm from "../components/forms/EmployeeForm";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import { Tooltip } from "react-tooltip";

export interface CompanyData {
  companyID: number;
  description: string;
  email: string;
  name: string;
}

const Companies = () => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });

  const { data } = useSWR<CompanyData[], AxiosError>(
    "http://127.0.0.1:8000/company/",
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      refreshWhenOffline: true,
      refreshWhenHidden: false,
      revalidateOnMount: true,
      // Retry configuration
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 3 times.
        if (retryCount >= 3) return;

        // Retry after 3 seconds.
        setTimeout(() => revalidate({ retryCount }), 3000);
      },
      // Success handler
      onSuccess() {},
      // Loading slow handler
      onLoadingSlow() {},
      onError(error) {
        console.log(`%c ${error}`, "color: red");
      },
    }
  );

  return (
    <Background className="companies-page-layout">
      <aside className="section card">
        <header
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h1>Create Company</h1>
          <CompanyForm />
        </header>
      </aside>
      <aside className="section card">
        <header
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h1>Add employee</h1>
          <EmployeeForm companies={data} />
        </header>
      </aside>

      <main className="companies-page section">
        <header>
          <h1>Companies</h1>
          <p>This section you can manage companies data</p>
        </header>
        <div style={{ zIndex: "1000", position: "absolute" }}>
          <Tooltip id="employees-tooltip" place="bottom" />
        </div>
        <CompanyList companies={data} />
      </main>
      <HomeButton />
    </Background>
  );
};

export default Companies;
