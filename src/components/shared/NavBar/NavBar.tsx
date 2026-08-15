import { useState } from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="mb-6 md:mb-10 relative w-full">
            <div className="w-full">
                <div className="bg-[#FF654D] w-full flex justify-between items-center px-4 sm:px-8 md:px-12 h-16 sm:h-20">
                    <a href="/" className="flex items-center">
                        <img src="/assets/images/logoImage.png" className="w-20 sm:w-28" alt="Logo" />
                    </a>

                    <nav className="hidden md:flex justify-between gap-6 text-white font-semibold text-sm lg:text-base">
                        <a href="/" className="hover:opacity-80 transition-opacity">Home</a>
                        <a href="/sobre-nos" className="hover:opacity-80 transition-opacity">Sobre Nós</a>
                        <a href="/como-participar" className="hover:opacity-80 transition-opacity">Como Participar</a>
                        <a href="/escotismo" className="hover:opacity-80 transition-opacity">Escotismo</a>
                        <a href="/contato" className="hover:opacity-80 transition-opacity">Contato</a>
                    </nav>

                    <button
                        className="md:hidden text-white p-2 rounded-md hover:bg-[#e0543c] transition-colors cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
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
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 w-64 h-full bg-[#FF654D] text-white flex flex-col p-6 z-50
              transform transition-transform duration-300 ease-in-out shadow-2xl
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    className="self-end mb-6 text-white p-1 hover:opacity-80 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
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

                <a href="/" onClick={() => setIsOpen(false)} className="mb-4 font-semibold text-lg hover:underline">Home</a>
                <a href="/sobre-nos" onClick={() => setIsOpen(false)} className="mb-4 text-lg hover:underline">Sobre Nós</a>
                <a href="/como-participar" onClick={() => setIsOpen(false)} className="mb-4 text-lg hover:underline">Como Participar</a>
                <a href="/escotismo" onClick={() => setIsOpen(false)} className="mb-4 text-lg hover:underline">Escotismo</a>
                <a href="/contato" onClick={() => setIsOpen(false)} className="mb-4 text-lg hover:underline">Contato</a>
            </div>
        </header>
    );
}
