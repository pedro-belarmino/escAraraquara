import AboutUsMainImage from "../components/pages/AboutUs/AboutUsMainImage";
import MissionVisionValuesSession from "../components/pages/AboutUs/MissionVisionValuesSession";
import OurHistorySession from "../components/pages/AboutUs/OurHistorySession";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

export default function AboutUs() {
    return (
        <>
            <NavBar />
            <AboutUsMainImage />
            <OurHistorySession />
            <MissionVisionValuesSession />
            <Footer />
        </>
    )
}