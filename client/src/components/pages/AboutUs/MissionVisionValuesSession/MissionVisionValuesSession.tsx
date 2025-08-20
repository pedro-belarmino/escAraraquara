export default function MissionVisionValuesSession() {
    return (
        <div className="w-full bg-[#D0C9BF] pt-10 pb-10">
            <div className="w-full max-w-6xl mx-5 md:mx-auto flex flex-col md:flex-row pl-5 pr-5 justify-around space-y-10 md:space-y-0 md:space-x-5">

                {/* MISSÃO */}
                <div className="w-full md:w-3/12 space-y-4">
                    <div className="flex place-self-center items-center">
                        <img src="/assets/newSVGs/Vetores 1_Prancheta 1.svg" className="w-32" alt="" />
                        <p className="p-5 text-[#FF654D] asap font-bold text-4xl">MISSÃO</p>
                    </div>
                    <p className="rubik text-[#00337C]">
                        <b>Formar cidadãos responsáveis, solidários e ativos na sociedade por meio do escotismo,</b> promovendo valores como ética, respeito e sustentabilidade.
                    </p>
                </div>

                {/* VISÃO */}
                <div className="w-full md:w-3/12 space-y-4">
                    <div className="flex place-self-center items-center">
                        <img src="/assets/newSVGs/Vetores 1_Prancheta 1 cópia 5.svg" className="w-32" alt="" />
                        <p className="text-[#FF654D] asap font-bold text-4xl">VISÃO</p>
                    </div>
                    <p className="rubik text-[#00337C]">
                        <b>Ser referência no escotismo,</b> impactando positivamente a vida de crianças, jovens e adultos por meio de experiências que desenvolvam <b>caráter, liderança e senso de responsabilidade</b>
                    </p>
                </div>

                {/* VALORES */}
                <div className="w-full md:w-3/12 space-y-4">
                    <div className="flex place-self-center items-center">
                        <img src="/assets/newSVGs/Vetores 1_Prancheta 1 cópia.svg" className="w-32" alt="" />
                        <p className="text-[#FF654D] asap font-bold text-4xl">VALORES</p>
                    </div>
                    <p className="rubik text-[#00337C]">
                        Somos guiados pelos princípios do escotismo: <b>respeito, fraternidade, responsabilidade e trabalho em equipe.</b> Acreditamos na educação pelo exemplo, no crescimento através da aventura e no impacto positivo das nossas ações na comunidade
                    </p>
                </div>

            </div>
        </div>
    )
}
