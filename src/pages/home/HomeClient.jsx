import Jumbotron from "@/components/home/jumbotron";
import { MarqueeDemo } from "@/components/home/marqueedemo";
import Spot from "@/components/home/spot";
import FAQ from "@/components/FAQ/FAQ";
import PresentationEnterprise from "@/components/home/presentationclient";

const HomeClient = () => {
  return (
    <>
    <Jumbotron />
    <MarqueeDemo />
    <Spot />
    <PresentationEnterprise />
    <FAQ />
    </>
  );
};

export default HomeClient;
