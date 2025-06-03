export default function FrequentlyAskedQuestions() {
    return (
        <div className="w-full bg-[#D0C9BF]">

            <div className="w-3/4 p-10 flex bg-yellow-100 space-x-10 place-self-center">

                <div className="w-1/2 bg-orange-300 space-y-4 ">
                    <p className="asap text-2xl font-bold text-[#FF654D]">PERGUNTAS FREQUENTES</p>
                    <div className="text-[#00337C] text-sm space-y-4">
                        <div>
                            <p className="font-semibold">1- Qual a idade mínima para participar?</p>
                            <p>Aceitamos crianças a partir de 6 anos e meio completos.</p>
                        </div>
                        <div>
                            <p className="font-semibold">2- As inscrições acontecem pessoalmente?</p>
                            <p>O primeiro contato ocorre por meio de um formulário online, que divulgamos no Instagram e Facebook.</p>
                        </div>
                        <div>
                            <p className="font-semibold">3- Há taxa de inscrição ou mensalidade?</p>
                            <p>Não há taxa de inscrição, porém sim, existe uma contribuição mensal para ajudar na manutenção do grupo e das atividades. Os valores são informados durante o processo de integração.</p>
                        </div>
                        <div>
                            <p className="font-semibold">4- Posso colocar meu filho(a) em uma lista de espera?</p>
                            <p>Não trabalhamos com lista de espera. Como as vagas dependem da disponibilidade de adultos voluntários, recomendamos acompanhar nossas redes sociais para futuras oportunidades.</p>
                        </div>
                        <div>
                            <p className="font-semibold">5- Os pais podem ajudar de alguma forma?</p>
                            <p>Sim! O escotismo na vida do jovem acontece com a participação dos pais, e nosso grupo também depende do envolvimento de adultos voluntários. Se você tem interesse em apoiar as atividades ou saber mais sobre o escotismo adulto, entre em contato conosco.</p>
                        </div>
                        <div>
                            <p className="font-semibold">6- Quando e onde acontecem as atividades?</p>
                            <p>Nossas atividades acontecem aos sábados na sede do grupo e em locais externos para vivências especiais, como acampamentos e ações comunitárias.</p>
                        </div>

                        <p>Se tiver mais dúvidas, entre em contato conosco pelas redes sociais ou fale com nossa equipe presencialmente em um de nossos encontros!</p>
                    </div>
                </div>
                <div className="w-1/2 bg-purple-300">

                </div>



            </div>

            <div className="w-full overflow-hidden">
                <img
                    src="public/assets/SVGs/trees.svg"
                    alt=""
                    className="w-full block"
                    style={{
                        clipPath: 'inset(0 0 80px 0)',
                        maxHeight: '240px', // altura da imagem original - 80px de corte
                        height: 'auto'
                    }}
                />
            </div>



        </div>
    )
}