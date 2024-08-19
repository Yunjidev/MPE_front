/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { FcOldTimeCamera } from "react-icons/fc";
"use client";

import { forwardRef, useRef } from "react";
import { cn } from "../../@/lib/utils";
import { AnimatedBeam } from "../../@/components/magicui/animated-beam";
import Svg1 from "../../assets/svgs/svg1.svg"
import Svg11 from "../../assets/svgs/svg11.svg"
import Svg12 from "../../assets/svgs/svg12.svg"
import Svg13 from "../../assets/svgs/svg13.svg"
import UserSvg from "../../assets/svgs/usersvg.svg"

// Circle Component
const Circle = forwardRef(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className
    )}
  >
    {children}
  </div>
));

Circle.displayName = "Circle";

// AnimatedBeamMultipleOutputDemo Component
export function AnimatedBeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const divRefs = {
    div1Ref: useRef(null),
    div2Ref: useRef(null),
    div3Ref: useRef(null),
    div4Ref: useRef(null),
    div5Ref: useRef(null),
    div6Ref: useRef(null),
    div7Ref: useRef(null),
  };

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background ",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={divRefs.div7Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={divRefs.div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={divRefs.div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={divRefs.div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={divRefs.div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={divRefs.div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={divRefs.div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div1Ref}
        toRef={divRefs.div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div2Ref}
        toRef={divRefs.div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div3Ref}
        toRef={divRefs.div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div4Ref}
        toRef={divRefs.div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div5Ref}
        toRef={divRefs.div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefs.div6Ref}
        toRef={divRefs.div7Ref}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  notion: () => (
    <FcOldTimeCamera />
      ),
      openai: () => (
        <div>
        <img src={Svg1} alt="svg1" />
      </div>
      ),

      googleDrive: () => (
        <div>
        <img src={Svg1} alt="svg1" />
      </div>
    
      ),
      googleDocs: () => (
        <div>
        <img src={Svg13} alt="svg13" />
      </div>
    
      ),
      whatsapp: () => (
        <div>
        <img src={Svg11} alt="svg11" />
      </div>
    
      ),
      messenger: () => (
        <div>
        <img src={Svg12} alt="svg12" />
      </div>
    
      ),
      user: () => (
        <div>
        <img src={UserSvg} alt="usersvg" />
      </div>
      ),
};
