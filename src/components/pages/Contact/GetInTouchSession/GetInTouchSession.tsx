export default function GetInTouchSession() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
            <h1 className="asap font-bold text-3xl sm:text-4xl text-[#FF654D] text-center lg:text-left">ENTRE EM CONTATO</h1>

            <div id="container" className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <div className="w-full lg:w-1/2">
                    <div className="text-[#00337C] space-y-6 text-start text-base sm:text-lg">
                        <div>
                            <p className="rubik text-xl font-bold">Será um prazer conversar com você!</p>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <a href="https://www.instagram.com/escoteiroararaquara" target="_blank" rel="noreferrer" className="rubik font-semibold hover:underline flex items-center gap-2">
                                Instagram
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="rubik font-bold text-lg">Onde Estamos</p>
                            <p className="rubik">
                                Av. Antônio Lourenço Corrêa, 491<br />
                                Vila Xavier - Araraquara - SP<br />
                                CEP 14810-138
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <img src="/assets/images/IMG_0877.JPG" className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-md" alt="Contato" />
                </div>
            </div>
        </div>
    )
}