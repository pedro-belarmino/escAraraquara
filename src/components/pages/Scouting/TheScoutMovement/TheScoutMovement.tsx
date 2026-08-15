export default function TheScoutMovement() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-8 items-center">

            {/* Texto */}
            <div className="w-full lg:w-1/2 space-y-5">
                <p className="text-[#FF654D] font-bold text-2xl sm:text-3xl md:text-4xl asap">O MOVIMENTO ESCOTEIRO</p>

                <div className="rubik text-base sm:text-lg space-y-4 text-[#00337C]">
                    <p><b>Criado em 1907 por Robert Baden-Powell (BP),</b> o escotismo é um movimento de educação não-formal presente em mais de 170 países, <b>impactando milhões</b> de crianças, jovens e adultos ao longo das décadas.</p>

                    <p>Com uma metodologia baseada na <b>aprendizagem pela prática,</b> o escotismo incentiva valores como <b>responsabilidade, liderança, trabalho em equipe e respeito à natureza,</b> formando cidadãos comprometidos <b>com um mundo melhor.</b></p>

                    <p>No Brasil, o movimento é organizado pela <b>União dos Escoteiros do Brasil (UEB),</b> seguindo princípios que unem aventura, desafios e crescimento pessoal.</p>

                    <p>Se quiser saber mais sobre o escotismo e sua história,
                        acesse: <a className="font-semibold hover:underline text-[#FF654D]" href="https://www.escoteiros.org.br" target="_blank" rel="noreferrer">www.escoteiros.org.br</a></p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <img src="/assets/images/Historia2.png" alt="O Movimento Escoteiro" className="w-full max-h-96 aspect-[6/4] object-cover rounded-2xl shadow-md object-center" />
            </div>

        </div>
    )
}