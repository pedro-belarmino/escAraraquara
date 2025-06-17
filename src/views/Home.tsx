import GetToKnowOurWork from "../components/pages/Home/GetToKnowOurWork/GetToKnowOurWork";
import HomeMainImage from "../components/pages/Home/HomeMainImage/HomeMainImage";
import LatestNewsSession from "../components/pages/Home/LatestNewsSession/LatestNewsSession";
import WhoWeAreSession from "../components/pages/Home/WhoWeAreSession/WhoWeAreSession";

export default function Home() {
    return (
        <>
            <HomeMainImage />
            <WhoWeAreSession />
            <GetToKnowOurWork />
            <LatestNewsSession />
        </>
    )
}