import ImageHub from "../ImageHub/ImageHub";

export default function OurHistorySession() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="hidden xl:block w-48 shrink-0 relative">
                <img
                    src="/assets/SVGs/board.svg"
                    alt=""
                    className="h-[180px] w-auto"
                />
            </div>

            <div className="w-full lg:w-7/12 space-y-5">
                <p className="asap text-3xl sm:text-4xl font-bold mb-5 text-[#ff654d]">NOSSA HISTÓRIA</p>
                <div className="rubik text-[#00337C] space-y-4 text-base sm:text-lg">
                    <p>
                        Desde 1972, o Grupo Escoteiro Araraquara José Luiz Torquato <b>promove o escotismo</b> como uma ferramenta de desenvolvimento pessoal e comunitário.
                    </p>
                    <p>
                        Fundado em 23 de abril, Dia Mundial do Escoteiro, <b>por José Carlos da Rocha Barros e seus amigos</b>, o grupo cresceu e consolidou sua presença na cidade, conquistando uma <b>sede própria e impactando inúmeras gerações</b>.
                    </p>
                    <p>
                        Em 2011, em homenagem a <b>José Luiz Torquato</b> - um chefe escoteiro exemplar, reconhecido por sua dedicação, alegria e superação -, o grupo recebeu seu nome atual.
                    </p>
                    <p>
                        Mais do que um movimento, <b>somos uma família que valoriza a união, acolhimento e o trabalho em equipe</b>, inspirando jovens e adultos a se tornarem cidadãos mais responsáveis e atuantes.
                    </p>
                    <p>
                        Atualmente, seguimos fortalecendo nossa essência e <b>ampliando nosso impacto na comunidade</b>. Com ética, respeito e sustentabilidade, trabalhamos para formar <b>cidadãos comprometidos em construir um mundo melhor</b>.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-5/12">
                <ImageHub />
            </div>
        </div>
    )
}