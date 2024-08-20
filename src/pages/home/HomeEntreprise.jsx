import Pricing from '../../components/pricing/pricing';
import Jumbotron from '../../components/home/jumbotron';
import Multicard from "@/components/home/Multicard/multicard";
import Stats from '@/components/home/stats';

const HomeEnterprise = () => {
  return (
    <>
    <Jumbotron />
    <Multicard />
    <Pricing />
    <Stats />

    </>

  )
};

export default HomeEnterprise;
