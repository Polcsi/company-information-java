/* 
  This component creates a custom select component.
*/

import { useGlobalContext } from "../../context";
import { jobTitles } from "../../data"; // The options stored in a seperate file

const CustomSelect = () => {
  const { styleRequiredInput } = useGlobalContext();

  return (
    <>
      <select
        style={{ width: "100%" }}
        className="select employeeJobTitle"
        defaultValue={0}
        onChange={(e) => styleRequiredInput(e as any)}
        required
      >
        <option disabled hidden value={0}>
          {/* default value it is hidden and disabled actually this is a placeholder */}
          Select Job
        </option>
        {jobTitles.map((job, index) => {
          return (
            <option key={index} value={job}>
              {job}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CustomSelect;
