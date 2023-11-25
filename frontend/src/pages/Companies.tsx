import Background from "../layout/Background";
import HomeButton from "../components/buttons/HomeButton";
import CompanyList from "../components/CompanyList";
import CompanyForm from "../components/forms/CompanyForm";
import EmployeeForm from "../components/forms/EmployeeForm";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import { Tooltip } from "react-tooltip";
import { APIResponse, BASE_URL } from "../globals";

export interface CompanyData {
  companyID: string;
  description: string;
  email: string;
  name: string;
  employeeIds: EmployeeData[];
}

export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  age: number;
}

const Companies = () => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });

  const { data, isLoading } = useSWR<APIResponse<CompanyData[]>, AxiosError>(
    `${BASE_URL}/api/v1/company`,
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
          {!isLoading && data ? <EmployeeForm companies={data.data} /> : null}
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
        {!isLoading && data ? <CompanyList companies={data.data} /> : null}
      </main>
      <HomeButton />
    </Background>
  );
};

export default Companies;
