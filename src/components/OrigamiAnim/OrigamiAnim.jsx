/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import svg1 from '../../assets/svgs/svg1.svg';
import svg2 from '../../assets/svgs/svg2.svg';
import svg3 from '../../assets/svgs/svg3.svg';
import svg4 from '../../assets/svgs/svg4.svg';
import svg5 from '../../assets/svgs/svg5.svg';
import svg6 from '../../assets/svgs/svg6.svg';
import svg7 from '../../assets/svgs/svg7.svg';
import svg8 from '../../assets/svgs/svg8.svg';
import svg9 from '../../assets/svgs/svg9.svg';
import svg10 from '../../assets/svgs/svg10.svg';
import svg11 from '../../assets/svgs/svg11.svg';
import svg12 from '../../assets/svgs/svg12.svg';
import svg13 from '../../assets/svgs/svg13.svg';
import svg14 from '../../assets/svgs/svg14.svg';

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({ items }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, []);

  return (
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className="relative z-0 h-72 w-96 shrink-0 rounded-xl border border-neutral-700"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>

      <hr
        style={{
          transform: "translateZ(1px)",
        }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
      />
    </div>
  );
};

const LogoItem = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50",
        className
      )}
    >
      {children}
    </div>
  );
};

const DivOrigami = () => {
  return (
    <section className="flex items-center lg:flex-row flex-col">
      <LogoRolodex
        items={[
          <LogoItem key={1} className="bg-orange-300 text-neutral-900">
            <img src={svg1} alt="Icon 1" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={2} className="bg-green-300 text-neutral-900">
            <img src={svg2} alt="Icon 2" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={3} className="bg-blue-300 text-neutral-900">
            <img src={svg3} alt="Icon 3" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={4} className="bg-white text-black">
            <img src={svg4} alt="Icon 4" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={5} className="bg-purple-300 text-neutral-900">
            <img src={svg5} alt="Icon 5" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={6} className="bg-yellow-300 text-neutral-900">
            <img src={svg6} alt="Icon 6" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={7} className="bg-red-300 text-neutral-900">
            <img src={svg7} alt="Icon 7" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={8} className="bg-cyan-300 text-neutral-900">
            <img src={svg8} alt="Icon 8" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={9} className="bg-teal-300 text-neutral-900">
            <img src={svg9} alt="Icon 9" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={10} className="bg-indigo-300 text-neutral-900">
            <img src={svg10} alt="Icon 10" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={11} className="bg-pink-300 text-neutral-900">
            <img src={svg11} alt="Icon 11" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={12} className="bg-gray-300 text-neutral-900">
            <img src={svg12} alt="Icon 12" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={13} className="bg-lime-300 text-neutral-900">
            <img src={svg13} alt="Icon 13" className="w-12 h-12" />
          </LogoItem>,
          <LogoItem key={14} className="bg-rose-300 text-neutral-900">
            <img src={svg14} alt="Icon 14" className="w-12 h-12" />
          </LogoItem>,
        ]}
      />
    </section>
  );
};

const OrigamiAnim = () => {
  return <DivOrigami />;
};

export default OrigamiAnim;
