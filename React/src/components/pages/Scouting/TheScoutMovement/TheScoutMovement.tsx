export default function TheScoutMovement() {
    return (
        <div className="flex w-3/4 p-10 place-self-center space-x-5 bg-sky-300">
            <div className="w-1/2 bg-red-300 space-y-5">

                <p className="text-[#FF654D] font-bold text-3xl asap ">O MOVIMENTO ESCOTEIRO</p>

                <div className="rubik text-sm space-y-5 text-[#00337C]">

                    <p><b>Criado em 1907 por Robert Baden-Powell (BP),</b> o escotismo é um movimento de educação não-formal presente em mais de 170 países, <b>impactando milhões</b> de crianças, jovens e adultos ao longo das décadas.</p>

                    <p>Com uma metodologia baseada na <b>aprendizagem pela prática,</b> o escotismo incentiva valores como <b>responsabilidade, liderança, trabalho em equipe e respeito à natureza,</b> formando cidadãos comprometidos <b>com um mundo melhor.</b></p>

                    <p>No Brasil, o movimento é organizado pela <b>União dos Escoteiros do Brasil (UEB),</b> seguindo princípios que unem aventura, desafios e crescimento pessoal.</p>

                    <p>Se quiser saber mais sobre o escotismo e sua história,
                        acesse: <a className="font-semibold hover:underline" href="https://www.escoteiros.org.br" target="blank">www.escoteiros.org.br</a></p>
                </div>

            </div>


            <div className="w-1/2 bg-green-300">
                <img src="/assets/images/Historia2.png" alt="" className="w-full" />
            </div>
        </div>
    )
}