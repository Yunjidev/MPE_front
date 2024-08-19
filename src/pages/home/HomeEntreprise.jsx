import Pricing from '../../components/pricing/pricing';
import Jumbotron from '../../components/home/jumbotron';
// import PresentationEnterprise from '../../components/home/presentationenterprise';
// import Mission from '@/components/home/mission';
import Multicard from "@/components/home/Multicard/multicard";


const HomeEnterprise = () => {
  return (
    <>
    <Jumbotron />
    <Multicard />

    {/* <PresentationEnterprise /> */}
    {/* <Mission /> */}
    <Pricing />

    </>

  )
};

export default HomeEnterprise;
