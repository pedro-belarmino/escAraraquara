export default function NavBar() {
    return (
        <div className="mb-8 mt-8">
            <div className="w-full">
                <div className="bg-orange-400 w-full flex pl-5 pr-5">
                    <div className="w-6/12 items-center justify-center">
                        <img src="src/assets/pepe.png" className="absolute w-1/12 place-self-center justify-center" alt="" />
                    </div>
                    <div className="w-6/12 justify-between flex m-4 text-white font-semibold">
                        <a href="">Home</a>
                        <a href="">Sobre Nós</a>
                        <a href="">Como Participar</a>
                        <a href="">Escotismo</a>
                        <a href="">Blog</a>
                        <a href="">Contato</a>
                        <p>!lupa!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}