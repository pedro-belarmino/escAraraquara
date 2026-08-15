import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import Footer from "../components/shared/Footer/Footer";


export default function Template() {
    return (
        <div className="flex-1 flex flex-col w-full min-h-screen">
            <NavBar />
            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}