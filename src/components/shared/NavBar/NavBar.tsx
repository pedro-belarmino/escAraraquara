import { useState } from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-10 mt-10 relative">
            <div className="w-full">
                <div className="bg-[#FF654D] w-full flex justify-between items-center pl-20 pr-5 h-16">
                    <div className="flex items-center">
                        <img src="/assets/images/logoImage.png" className="w-28" alt="Logo" />
                    </div>

                    <div className="hidden md:flex justify-between gap-6 text-white font-semibold">
                        <a href="/">Home</a>
                        <a href="/sobre-nos">Sobre Nós</a>
                        <a href="/como-participar">Como Participar</a>
                        <a href="/escotismo">Escotismo</a>
                        <a href="/blog">Blog</a>
                        <a href="/contato">Contato</a>
                        {/* <a href="">
                            <svg
                                className="h-7 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </a> */}
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

                <a href="/" className="mb-4 font-semibold">Home</a>
                <a href="/sobre-nos" className="mb-4">Sobre Nós</a>
                <a href="/como-participar" className="mb-4">Como Participar</a>
                <a href="/escotismo" className="mb-4">Escotismo</a>
                <a href="/blog" className="mb-4">Blog</a>
                <a href="/contato" className="mb-4">Contato</a>
            </div>
        </div>
    );
}
