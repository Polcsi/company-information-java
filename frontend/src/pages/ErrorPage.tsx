/* 
  Error page for "/*" route.
  Error page show when the user navigates to an non-implemented route
*/

import { FaHome } from "react-icons/fa";
import Background from "../layout/Background";

const ErrorPage = () => {
  return (
    <Background className="error-page">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <a href="/">
        <FaHome />
        Home
      </a>
    </Background>
  );
};

export default ErrorPage;
