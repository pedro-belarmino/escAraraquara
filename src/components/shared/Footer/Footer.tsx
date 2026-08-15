export default function Footer() {
    return (
        <footer className="w-full bg-[#00337C] text-white mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-[#2e55b3]">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start pt-10 pb-6 gap-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <img src="/assets/images/logoImage.png" className="w-24 sm:w-28" alt="Logo" />
                        <div className="text-xl sm:text-2xl asap ml-3 flex flex-col text-left font-semibold">
                            <p>VAMOS JUNTOS</p>
                            <p>MUDAR O MUNDO!</p>
                        </div>
                    </div>

                    <div
                        id="container"
                        className="w-full md:w-auto rubik flex flex-col sm:flex-row justify-around text-center sm:text-left text-xs gap-6 sm:gap-12"
                    >
                        <div className="hidden sm:flex flex-col space-y-1">
                            <a href="/" className="font-bold hover:underline">Home</a>
                            <a href="/sobre-nos" className="hover:underline">Sobre Nós</a>
                            <a href="/como-participar" className="hover:underline">Como Participar</a>
                            <a href="/escotismo" className="hover:underline">Escotismo</a>
                            <a href="/contato" className="hover:underline">Contato</a>
                        </div>

                        <div className="flex flex-col text-center sm:text-left">
                            <p className="font-bold mb-1">Onde estamos?</p>
                            <p>
                                Av. Antônio Lourenço Corrêa <br />
                                491 - Vila Xavier <br />
                                Araraquara - SP <br />
                                CEP 14810-138
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between items-center py-6 gap-4 text-center md:text-left">
                    <div className="flex items-center justify-center">
                        <svg className="h-4 w-4 mr-1 shrink-0"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <path d="M14.5 9a3.5 4 0 1 0 0 6" />
                        </svg>
                        <p className="text-xs">2025 Grupo Escoteiro Araraquara - Todos os Direitos Reservados</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="https://www.instagram.com/escoteiroararaquara" target="_blank" rel="noreferrer" className="hover:opacity-80">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="4" y="4" width="16" height="16" rx="4" />
                                <circle cx="12" cy="12" r="3" />
                                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                            </svg>
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                            </svg>
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                    </div>

                    <a href="/login" className="border border-white px-3 py-1.5 rounded-xl text-xs hover:bg-white hover:text-[#00337C] transition-colors">
                        Sou escotista/dirigente
                    </a>
                </div>
            </div>
        </footer>
    )
}