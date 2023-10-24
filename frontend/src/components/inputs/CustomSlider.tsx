/* 
  This component creates a custom slider.
*/

import { useEffect, useRef, useCallback } from "react";
import { useGlobalContext } from "../../context";

interface CustomSliderProps {
  min: number;
  max: number;
  value?: number;
}

const CustomSlider = ({ min, max, value }: CustomSliderProps) => {
  /* Define variables */
  const innerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderContainer = useRef(null);
  const sliderTrack = useRef<HTMLDivElement>(null);
  const { setNumberOfEmployees } = useGlobalContext();

  useEffect(() => {
    update();
  }, []);

  /* Updates the ui looking and store the setted value  */
  const update = useCallback(() => {
    if (
      sliderRef.current === null ||
      innerRef.current === null ||
      sliderTrack.current === null
    )
      return;
    let valuePercentage: number =
      parseInt(sliderRef.current.value) / (max - min);
    innerRef.current.style.marginTop =
      (parseInt(sliderRef.current.value) - 1) * -30 + "px";
    sliderTrack.current.style.setProperty(
      "--value",
      valuePercentage.toString()
    );

    setNumberOfEmployees(parseInt(sliderRef.current.value));
  }, [max, min, setNumberOfEmployees, value]);

  /* useEffect for initialize component variables */
  useEffect(() => {
    const element = sliderRef.current;

    if (innerRef.current) innerRef.current.innerHTML = ""; // clear the element
    setNumberOfEmployees(min); // set default value to min
    element?.addEventListener("input", update);

    /* Fill the container element with max number of elements. This will be next to the slider and shows the setted value. */
    for (let i = min; i < max + 1; i++) {
      let div: HTMLDivElement = document.createElement("div");
      div.innerText = i.toString();
      innerRef?.current!.appendChild(div);
    }

    return () => {
      element?.removeEventListener("input", update);
    };
  }, [min, max, setNumberOfEmployees, update]);
  return (
    <div id="slider-container" ref={sliderContainer}>
      <input
        id="slider"
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        defaultValue={value}
      />
      <div id="slider-track" ref={sliderTrack}></div>
      <div className="value-outer">
        <div className="value-inner" ref={innerRef}></div>
      </div>
    </div>
  );
};

export default CustomSlider;
