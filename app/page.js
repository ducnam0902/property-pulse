import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Image from "next/image";
import HomeProperties from "../components/HomeProperties";

export default  function Home() {
  return (
    <>
      <Hero/>
      <InfoBoxes/>
      <HomeProperties/>
    </>
  );
}
