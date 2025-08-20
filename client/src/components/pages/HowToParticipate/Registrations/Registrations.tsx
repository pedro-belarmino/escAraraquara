export default function Registrations() {
    return (
        <div className="w-full max-w-6xl p-10 mx-auto space-y-5">

            {/* Título */}
            <p className="text-[#FF654D] font-bold text-5xl asap text-left lg:text-left">
                INSCRIÇÕES
            </p>

            {/* Conteúdo */}
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-10">

                {/* Texto */}
                <div className="w-full lg:w-1/2 space-y-5">
                    <div className="rubik space-y-5 text-lg text-[#00337C]">
                        <p>
                            Abrimos novas vagas, se disponíveis, <b>duas vezes ao ano, em janeiro e julho,</b> de acordo com a disponibilidade de adultos voluntários e estrutura necessária para manter a qualidade das atividades. Como temos um <b>número limitado de vagas,</b> nem sempre conseguimos atender a todos os interessados de imediato.
                        </p>
                        <p>Sempre anunciamos a abertura das inscrições através de nossas redes sociais:</p>

                        <div className="flex flex-col">
                            <a href="https://www.instagram.com/escoteiroararaquara/#" className="hover:underline" target="_blank">Instagram: @escoteiroararaquara</a>
                            <a href="https://www.facebook.com/EscoteiroAraraquara" className="hover:underline" target="_blank">Facebook: Escoteiro Araraquara</a>
                        </div>

                        <p>É por lá que anunciamos todas as informações sobre o processo de inscrição, incluindo prazos e formas de participação.</p>
                    </div>
                </div>

                {/* Imagem */}
                <div className="w-full lg:w-1/2 flex items-center">
                    <img src="/assets/images/inscricao.jpg" alt="" className="w-full object-cover object-center" />
                </div>

            </div>
        </div>



    )
}