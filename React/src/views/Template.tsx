import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import Footer from "../components/shared/Footer/Footer";


export default function Template() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}