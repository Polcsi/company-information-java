import axios, { AxiosError } from "axios";
import Background from "../layout/Background";
import { GoOrganization } from "react-icons/go";
import { SiAwsorganizations } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useGlobalContext } from "../context";
import { CompanyData } from "./Companies";
import { APIResponse, BASE_URL } from "../globals";

const MainPage = () => {
  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();
  // Accessing the toastError function from the global context
  const { toastError } = useGlobalContext();
  // Fetching data from the backend
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
      onError(error) {
        toastError("Something went wrong");
        console.log(`%c ${error}`, "color: red");
      },
    }
  );

  return (
    <Background>
      <main
        style={{
          color: "white",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <header
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 2.8rem)" }}>
            Welcome on the Home Page
          </h1>
          <p style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)" }}>
            Please choose what would you like to do
          </p>
        </header>
        <section
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <div
            className="main-card section"
            onClick={() => navigate("/companies")}
          >
            <div className="main-card-icon">
              <GoOrganization />
            </div>
            <span className="main-card-title">Company Information</span>
            <p className="main-card-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque itaque mollitia voluptatum sint assumenda in totam
              provident enim, fugiat accusantium.
            </p>
            <div className="main-page-indicator">
              <span style={{ fontWeight: "600" }}>
                {data ? data?.data.length : 0}
              </span>
              {isLoading ? (
                "Loading..."
              ) : (
                <span>
                  {(data?.data.length ? data?.data.length : 0) > 1
                    ? "Companies"
                    : "Company"}
                </span>
              )}
            </div>
          </div>
          <div
            className="main-card section"
            onClick={() => navigate("/create-company")}
          >
            <div className="main-card-icon">
              <SiAwsorganizations />
            </div>
            <span className="main-card-title">Create Company</span>
            <p className="main-card-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque itaque mollitia voluptatum sint assumenda in totam
              provident enim, fugiat accusantium.
            </p>
            <div className="main-page-indicator">Click to create</div>
          </div>
        </section>
      </main>
    </Background>
  );
};

export default MainPage;
