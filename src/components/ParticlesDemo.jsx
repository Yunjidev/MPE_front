import React, { useEffect, useState } from "react";
import Particles from "../@/components/magicui/particles";

const ParticlesDemo = () => {
    return (
      <div className="absolute inset-0 z-0">
        <Particles className="absolute inset-0" quantity={200} ease={80} color="#ffffff" refresh />
      </div>
    );
  };

export default ParticlesDemo;
