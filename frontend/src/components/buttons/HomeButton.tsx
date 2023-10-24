/* 
  This is a component which creates a button and the user will be able to navigate back to the home page with this button.
*/
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

interface HomeButtonProps {
  to?: string;
}

const HomeButton = ({ to = "/" }: HomeButtonProps) => {
  return (
    <Link className="home-button" to={to}>
      <IoIosArrowRoundBack />
    </Link>
  );
};

export default HomeButton;
