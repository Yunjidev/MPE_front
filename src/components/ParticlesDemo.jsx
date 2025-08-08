/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Particles from "../@/components/magicui/particles";

const ParticlesDemo = ({ isDarkMode }) => {
  const particleColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <Particles
      className={"inset-0 -z-10 bg-neutral-800 fixed"}
      quantity={200}
      ease={80}
      color={particleColor}
      refresh
    />
  );
};

export default ParticlesDemo;