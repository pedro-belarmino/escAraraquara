export default function FrequentlyAskedQuestions() {
    return (
        <div className="w-full bg-[#D0C9BF]">

            <div className="w-full max-w-6xl p-10 flex flex-col md:flex-row md:space-x-10 place-self-center space-y-5 md:space-y-0">

                {/* Texto */}
                <div className="w-full md:w-1/2 space-y-4">
                    <p className="asap text-4xl md:text-4xl font-bold text-[#FF654D] text-center md:text-left">PERGUNTAS FREQUENTES</p>

                    <div className="text-[#00337C] space-y-4 md:text-base">
                        <div>
                            <b>1- Qual a idade mínima para participar?</b>
                            <p>Aceitamos crianças a partir de 6 anos e meio completos.</p>
                        </div>
                        <div>
                            <b>2- As inscrições acontecem pessoalmente?</b>
                            <p>O primeiro contato ocorre por meio de um formulário online, que divulgamos no Instagram e Facebook.</p>
                        </div>
                        <div>
                            <b>3- Há taxa de inscrição ou mensalidade?</b>
                            <p>Não há taxa de inscrição, porém sim, existe uma contribuição mensal para ajudar na manutenção do grupo e das atividades. Os valores são informados durante o processo de integração.</p>
                        </div>
                        <div>
                            <b>4- Posso colocar meu filho(a) em uma lista de espera?</b>
                            <p>Não trabalhamos com lista de espera. Como as vagas dependem da disponibilidade de adultos voluntários, recomendamos acompanhar nossas redes sociais para futuras oportunidades.</p>
                        </div>
                        <div>
                            <b>5- Os pais podem ajudar de alguma forma?</b>
                            <p>Sim! O escotismo na vida do jovem acontece com a participação dos pais, e nosso grupo também depende do envolvimento de adultos voluntários. Se você tem interesse em apoiar as atividades ou saber mais sobre o escotismo adulto, entre em contato conosco.</p>
                        </div>
                        <div>
                            <b>6- Quando e onde acontecem as atividades?</b>
                            <p>Nossas atividades acontecem aos sábados na sede do grupo e em locais externos para vivências especiais, como acampamentos e ações comunitárias.</p>
                        </div>

                        <p>Se tiver mais dúvidas, entre em contato conosco pelas redes sociais ou fale com nossa equipe presencialmente em um de nossos encontros!</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 hidden lg:flex items-center justify-center">
                    <img src="/assets/newSVGs/Vetores 1-07.svg" alt="" className="w-full object-contain" />
                </div>

            </div>

            <div className="w-full overflow-hidden">
                <img src="/assets/SVGs/trees.svg" alt="" className="w-full block" />
            </div>

        </div>

    )
}