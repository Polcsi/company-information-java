import Lottie from "lottie-react";
import animation from "../assets/lotties/loading_animation.json";

const Loading = () => {
  return (
    <div className="section loading-container">
      <Lottie animationData={animation} />
      <section>
        <h1>We are almost there...</h1>
      </section>
    </div>
  );
};

export default Loading;
