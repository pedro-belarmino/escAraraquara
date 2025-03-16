export default function NavBar() {
    return (
        <div className="mb-8 mt-8">
            <div className="w-full">
                <div className="bg-[#FF654D] w-full flex pl-5 pr-5">
                    <div className="w-3/12 flex justify-center items-center h-16">
                        <img src="src/assets/images/logoImage.png" className="w-28" alt="" />
                    </div>
                    <div className="w-3/12"></div>
                    <div className="w-6/12 justify-between flex m-4 text-white font-semibold">
                        <a href="">Home</a>
                        <a href="">Sobre Nós</a>
                        <a href="">Como Participar</a>
                        <a href="">Escotismo</a>
                        <a href="">Blog</a>
                        <a href="">Contato</a>
                        <a href=""><svg className="h-7 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
