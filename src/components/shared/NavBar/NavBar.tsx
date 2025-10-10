import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { mode, toggleTheme } = useTheme();

    return (
        <div className="mb-10 mt-10 relative">
            <div className="w-full">
                <div className="bg-[#FF654D] w-full flex justify-between items-center pl-20 pr-5 h-16">
                    <div className="flex items-center">
                        <img src="/assets/images/logoImage.png" className="w-28" alt="Logo" />
                    </div>

                    <div className="hidden md:flex justify-between items-center gap-6 text-white font-semibold">
                        <Link to="/">Home</Link>
                        <Link to="/sobre-nos">Sobre Nós</Link>
                        <Link to="/como-participar">Como Participar</Link>
                        <Link to="/escotismo">Escotismo</Link>
                        <a href="/blog">Blog</a>
                        <Link to="/contato">Contato</Link>
                        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm brightness-40 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 w-64 h-full bg-[#FF654D] text-white flex flex-col p-6 z-50
              transform transition-transform duration-300 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    className="self-end mb-6 text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <Link to="/" className="mb-4 font-semibold">Home</Link>
                <Link to="/sobre-nos" className="mb-4">Sobre Nós</Link>
                <Link to="/como-participar" className="mb-4">Como Participar</Link>
                <Link to="/escotismo" className="mb-4">Escotismo</Link>
                <a href="/blog" className="mb-4">Blog</a>
                <Link to="/contato" className="mb-4">Contato</Link>
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </div>
        </div>
    );
}