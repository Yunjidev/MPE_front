import Jumbotron from "@/components/home/jumbotron";
import { MarqueeDemo } from "@/components/home/marqueedemo";
import Spot from "@/components/home/spot";
import Multicard from "@/components/home/Multicard/multicardclient";
import Stats from '@/components/home/stats';
const HomeClient = () => {
  return (
    <>
    <Jumbotron />
    <MarqueeDemo />
    <Spot />
    <Multicard />
    <Stats />

    </>
  );
};

export default HomeClient;
