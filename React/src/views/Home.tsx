import HomeMainImage from "../components/pages/Home/HomeMainImage";
import WhoWeAreSession from "../components/pages/Home/WhoWeAreSession";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

export default function Home() {
    return (
        <>
            <NavBar />
            <HomeMainImage />
            <WhoWeAreSession />
            <Footer />
        </>
    )
}