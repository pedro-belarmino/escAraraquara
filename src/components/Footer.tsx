export default function Footer() {
    return (
        <div>
            <footer className="w-full text-white flex w-min-650px bg-[#0032AB] min-w-96">
                <div className="w-2/12 ">
                </div>
                <div className="w-8/12 text-center divide-y divide-slate-500">
                    <div className="flex pb-6 pt-10">
                        <div className="flex items-center w-6/12">
                            <img src="src/assets/pepe.png" alt="" className="m-1" />
                            <div className=" m-1 flex flex-col text-left font-semibold text-l font-rubik"> /*ver por que não deu certo a fonte */
                                <p>VAMOS JUNTOS</p>
                                <p>MUDAR O MUNDO!</p>
                            </div>
                        </div>
                        <div className="w-6/12 flex text-start justify-around text-xs pt-4">
                            <div className="flex flex-col">
                                <a href="" className="font-bold">Home</a>
                                <a href="">Sobre Nós</a>
                                <a href="">Como Participar</a>
                                <a href="">Escotismo</a>
                                <a href="">Blog</a>
                                <a href="">Contato</a>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Onde estamos?</p>
                                <p>
                                    Av. Antônio Lourenço Corrêa <br />
                                    491 - Vila Xavier <br />
                                    Araraquara - SP <br />
                                    CEP 14810-138
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mb-6 mt-6">
                        <div className="flex">
                            <svg className="h-4 w-4 mr-1"
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
                            <p className="text-xs">Grupo Escoteiro Araraquara - Todos os Direitos Reservados </p>
                        </div>

                        <div className="flex">
                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="4" />  <circle cx="12" cy="12" r="3" />  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                            </svg>
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                            </svg>
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />  <rect x="2" y="9" width="4" height="12" />  <circle cx="4" cy="4" r="2" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-2/12">
                </div>
            </footer>
        </div>
    )
}