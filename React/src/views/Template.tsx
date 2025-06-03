import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";


export default function Template() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}