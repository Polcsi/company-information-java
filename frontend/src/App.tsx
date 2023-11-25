import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import Background from "./layout/Background";
import Loading from "./layout/Loading";

// Function to introduce fake delay to simulate loading
function fakeDelay() {
  return (promise: any) =>
    promise.then(
      (data: any) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), 1000);
        })
    );
}

// lazy load pages
const CreateCompanyWithEmployees = lazy(() =>
  fakeDelay()(import("./pages/CreateCompanyWithEmployees"))
);
const ErrorPage = lazy(() => fakeDelay()(import("./pages/ErrorPage")));
const ResultsPage = lazy(() => fakeDelay()(import("./pages/ResultsPage")));
const MainPage = lazy(() => fakeDelay()(import("./pages/MainPage")));
const Companies = lazy(() => fakeDelay()(import("./pages/Companies")));
const SingleCompany = lazy(() => fakeDelay()(import("./pages/SingleCompany")));

const App = () => {
  return (
    <>
      <Router>
        <Suspense
          fallback={
            <Background className="loading-background">
              <Loading />
            </Background>
          }
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<SingleCompany />} />
            <Route
              path="/create-company"
              element={<CreateCompanyWithEmployees />}
            />
            <Route path="results" element={<ResultsPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
