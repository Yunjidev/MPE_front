/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
"use client";
import { FcOldTimeCamera } from "react-icons/fc";

import { forwardRef, useRef } from "react";
import { cn } from "../../@/lib/utils";
import { AnimatedBeam } from "../../@/components/magicui/animated-beam";
import Svg1 from "../../assets/svgs/svg1.svg"
import Svg11 from "../../assets/svgs/svg11.svg"
import Svg12 from "../../assets/svgs/svg12.svg"
import Svg13 from "../../assets/svgs/svg13.svg"
import UserSvg from "../../assets/svgs/usersvg.svg"

const Circle = forwardRef(function Circle({ className, children }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background ",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} />
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
